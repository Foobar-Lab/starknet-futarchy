use starknet::ContractAddress;
use openzeppelin::access::ownable::OwnableComponent;

#[starknet::interface]
pub trait IGovernance<TContractState> {
    fn createProposal(ref self: TContractState, distributedFileSystemIdentifier: felt252, tradingDuration: felt252, adoptionDuration: felt252, oracle: ContractAddress, market: ContractAddress);
    fn getProposals(self: @TContractState) -> Array<Proposal>;
    fn getProposalsIds(self: @TContractState) -> Array<felt252>;
    fn getAuthorProposals(self: @TContractState, author: ContractAddress) -> Array<Proposal>;
    fn getAuthorProposalsIds(self: @TContractState, author: ContractAddress) -> Array<felt252>;
    fn getProposalById(self: @TContractState, id: felt252) -> Proposal;
    fn resolveTradingPhase(ref self: TContractState);
    fn resolveAdoptionPhase(ref self: TContractState);
}

// Description of the status of a proposal
#[derive(Drop, Serde, Copy, starknet::Store)]
enum Status {
    TRADING,
    ADOPTED,
    FAILED,
    SUCCESS,
}

#[derive(Serde, Drop, Copy, starknet::Store, starknet::Event)]
struct Proposal {
    pub id: felt252,
    pub distributedFileSystemIdentifier: felt252,
    pub authorAddress: ContractAddress,
    pub status: Status,
    pub marketAddress: ContractAddress,
    pub oracleAddress: ContractAddress,
    pub tradingPhaseDurationInSeconds: u32,
    pub adoptionPhaseDurationInSeconds: u32,
}

#[starknet::contract]
pub mod Governance {

    use backend::governance::IGovernance;
    use core::traits::Into;
    use core::traits::TryInto;
    use core::array::ArrayTrait;
    use core::option::OptionTrait;
    use starknet::ContractAddress;
    use starknet::storage::Map;
    use super::Proposal;
    use super::Status;
    use super::StoreFelt252Array;
    

    component!(path: super::OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = super::OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = super::OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        pub proposalsIds: Array<felt252>, // WARNING : Stored arrays can't contain more than 255 elements, should be considered in future scopes
        pub proposalById : Map::<felt252, Proposal>,
        pub proposalsByAuthor: Map::<ContractAddress, Array<felt252>>, // WARNING : Stored arrays can't contain more than 255 elements, should be considered in future scopes
        #[substorage(v0)]
        ownable: super::OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        proposalCreated: super::Proposal,
        OwnableEvent: super::OwnableComponent::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState){
        let caller_address = starknet::get_caller_address();
        self.ownable.initializer(caller_address);
    }

    #[abi(embed_v0)]
    impl GovernanceImpl of super::IGovernance<ContractState> {

        fn createProposal(ref self: ContractState, distributedFileSystemIdentifier: felt252, tradingDuration: felt252, adoptionDuration: felt252, oracle: ContractAddress, market: ContractAddress) {
            let author = starknet::get_caller_address();
            let id = self.getProposalsIds().len();
            let proposalCreated = Proposal {
                id: id.into(),
                distributedFileSystemIdentifier: distributedFileSystemIdentifier,
                authorAddress: author,
                status: Status::TRADING,
                marketAddress: market, //TODO : marketAddress should not be a parameter but the address of a market contract deployed for this proposal
                oracleAddress: oracle, //TODO : same 
                tradingPhaseDurationInSeconds: tradingDuration.try_into().unwrap(),
                adoptionPhaseDurationInSeconds: adoptionDuration.try_into().unwrap(),
            };
            //First let's add our proposal id to our array of proposal ids
            let mut allProposals = self.getProposalsIds();
            allProposals.append(proposalCreated.id);
            self.proposalsIds.write(allProposals);

            // Then add the proposal to our mapping of proposal by id
            self.proposalById.write(proposalCreated.id, proposalCreated);
            
            // Finally add the proposal id to the mapping of proposals ids by author address
            let mut proposalsIdFromAuthor = self.getAuthorProposalsIds(author);
            proposalsIdFromAuthor.append(id.into());
            self.proposalsByAuthor.write(author, proposalsIdFromAuthor);
        }

        // Return all proposal ids
        fn getProposalsIds(self: @ContractState) -> Array<felt252> {
            self.proposalsIds.read()
        }

        // Return proposal ids from an author
        fn getAuthorProposalsIds(self: @ContractState, author: ContractAddress) -> Array<felt252> {
            self.proposalsByAuthor.read(author)
        }

        // Return proposals from an author
        fn getAuthorProposals(self: @ContractState, author: ContractAddress) -> Array<Proposal> {
            let mut ids = self.getAuthorProposalsIds(author);
            let mut arrayOfProposals: Array<Proposal> = array![];
            while let Option::Some(element) = ids.pop_front() {
                arrayOfProposals.append(self.getProposalById(element));
            };
            arrayOfProposals
        }

        // Return the proposal corresponding to its id
        fn getProposalById(self: @ContractState, id: felt252) -> Proposal {
            self.proposalById.read(id)
        }

        // Return all proposals
        fn getProposals(self: @ContractState) -> Array<Proposal> {
            let mut ids = self.getProposalsIds();
            let mut arrayOfProposals: Array<Proposal> = array![];
            while let Option::Some(element) = ids.pop_front() {
                arrayOfProposals.append(self.getProposalById(element));
            };
            arrayOfProposals
        }
        
        fn resolveTradingPhase(ref self: ContractState) {
            //TODO
        }

        fn resolveAdoptionPhase(ref self: ContractState) {
            //TODO
        }

        
    }
}

// This block of code is used to store Array<felt252> in the Storage.
impl StoreFelt252Array of starknet::Store<Array<felt252>> {
    fn read(address_domain: u32, base: starknet::storage_access::StorageBaseAddress) -> starknet::SyscallResult<Array<felt252>> {
        StoreFelt252Array::read_at_offset(address_domain, base, 0)
    }

    fn write(
        address_domain: u32, base: starknet::storage_access::StorageBaseAddress, value: Array<felt252>
    ) -> starknet::SyscallResult<()> {
        StoreFelt252Array::write_at_offset(address_domain, base, 0, value)
    }

    fn read_at_offset(
        address_domain: u32, base: starknet::storage_access::StorageBaseAddress, mut offset: u8
    ) -> starknet::SyscallResult<Array<felt252>> {
        let mut arr: Array<felt252> = array![];

        // Read the stored array's length. If the length is greater than 255, the read will fail.
        let len: u8 = starknet::Store::<u8>::read_at_offset(address_domain, base, offset)
            .expect('Storage Span too large');
        offset += 1;

        // Sequentially read all stored elements and append them to the array.
        let exit = len + offset;
        loop {
            if offset >= exit {
                break;
            }

            let value = starknet::Store::<felt252>::read_at_offset(address_domain, base, offset).unwrap();
            arr.append(value);
            offset += starknet::Store::<felt252>::size();
        };

        // Return the array.
        Result::Ok(arr)
    }

    fn write_at_offset(
        address_domain: u32, base: starknet::storage_access::StorageBaseAddress, mut offset: u8, mut value: Array<felt252>
    ) -> starknet::SyscallResult<()> {
        // Store the length of the array in the first storage slot.
        let len: u8 = value.len().try_into().expect('Storage - Span too large');
        starknet::Store::<u8>::write_at_offset(address_domain, base, offset, len).unwrap();
        offset += 1;

        // Store the array elements sequentially
        while let Option::Some(element) = value
            .pop_front() {
                starknet::Store::<felt252>::write_at_offset(address_domain, base, offset, element).unwrap();
                offset += starknet::Store::<felt252>::size();
            };

        Result::Ok(())
    }

    fn size() -> u8 {
        255 * starknet::Store::<felt252>::size()
    }
}