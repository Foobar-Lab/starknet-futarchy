use starknet::ContractAddress;
use openzeppelin::access::ownable::OwnableComponent;

#[starknet::interface]
pub trait IMarket<TContractState> {
    fn getYesBalance(self: @TContractState) -> u256;
    fn getNoBalance(self: @TContractState) -> u256;
    fn getYesBalanceByAccount(self: @TContractState, account: ContractAddress) -> u256;
    fn getNoBalanceByAccount(self: @TContractState, account: ContractAddress) -> u256;
    fn buy(ref self: TContractState, account: ContractAddress, tokenChoice: bool, amount: u256);
    fn getShare(self: @TContractState, tokenChoice: bool, account: ContractAddress) -> u256; 
    fn get_token_winner(self: @TContractState) -> TokenState;
    fn withdraw(ref self: TContractState, account: ContractAddress);
    fn resolve(ref self: TContractState, token_winner: bool);
    fn is_resolved(self: @TContractState) -> bool;
}

// Description of token state
#[derive(Drop, Serde, Copy, starknet::Store)]
enum TokenState {
    YES,
    NO,
    UNDEFINED
}

#[starknet::contract]
pub mod Market {

    use backend::market::IMarket;
    use backend::yestoken::{IYesTokenDispatcher, IYesTokenDispatcherTrait};
    use backend::notoken::{INoTokenDispatcher, INoTokenDispatcherTrait};
    use starknet::{
        ContractAddress, get_contract_address
    };
    use starknet::storage::Map;
    use super::TokenState;

    component!(path: super::OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = super::OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = super::OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        yesToken : IYesTokenDispatcher,
        noToken : INoTokenDispatcher,
        token_winner: TokenState,
        resolution: bool,
        yes_balance_by_account: Map::<ContractAddress, u256>,
        no_balance_by_account: Map::<ContractAddress, u256>,
        #[substorage(v0)]
        ownable: super::OwnableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OwnableEvent: super::OwnableComponent::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, yesTokenAddress: ContractAddress, noTokenAddress: ContractAddress){
        let caller_address = starknet::get_caller_address();
        self.ownable.initializer(caller_address);
        let yesTokenDispatcher = IYesTokenDispatcher { contract_address: yesTokenAddress };
        self.yesToken.write(yesTokenDispatcher);
        let noTokenDispatcher = INoTokenDispatcher { contract_address: noTokenAddress };
        self.noToken.write(noTokenDispatcher);
        self.token_winner.write(TokenState::UNDEFINED);
    }

    #[abi(embed_v0)]
    impl MarketImpl of super::IMarket<ContractState> {
        fn getYesBalance(self: @ContractState) -> u256 {
            self.yesToken.read().total_votes()
        }

        fn getNoBalance(self: @ContractState) -> u256 {
            self.noToken.read().total_votes()
        }

        fn getYesBalanceByAccount(self: @ContractState, account: ContractAddress) -> u256 {
            self.yes_balance_by_account.read(account)
        }

        fn getNoBalanceByAccount(self: @ContractState, account: ContractAddress) -> u256 {
            self.no_balance_by_account.read(account)
        }

        fn buy(ref self: ContractState, account: ContractAddress, tokenChoice: bool, amount: u256) {
            let this = get_contract_address();

            if tokenChoice {
                self.yesToken.read().mint(amount, this);
                let yesBalanceByAccount = self.getYesBalanceByAccount(account);
                self.yes_balance_by_account.write(account, yesBalanceByAccount + amount);
            } else {
                self.noToken.read().mint(amount, this);
                let noBalanceByAccount = self.getNoBalanceByAccount(account);
                self.no_balance_by_account.write(account, noBalanceByAccount + amount);
            }
        }

        fn getShare(self: @ContractState, tokenChoice: bool, account: ContractAddress) -> u256 {
            if tokenChoice {
                let yesBalanceByAccount = self.getYesBalanceByAccount(account);
                let yesBalanceTotal = self.getYesBalance();
                yesBalanceByAccount / yesBalanceTotal
            } else {
                let noBalanceByAccount = self.getNoBalanceByAccount(account);
                let noBalanceTotal = self.getNoBalance();
                noBalanceByAccount / noBalanceTotal
            }
        }

        fn get_token_winner(self: @ContractState) -> TokenState {
            self.token_winner.read()
        }

        fn withdraw(ref self: ContractState, account: ContractAddress) {
            assert(self.is_resolved(), 'Proposal is not resolved yet');
            let this = get_contract_address();

            match self.get_token_winner() {
                TokenState::YES => {
                    let yesShares = self.getYesBalanceByAccount(account);
                    let noShares = self.getShare(true, account) * self.getNoBalance();
                    self.yesToken.read().transfer_vote(this, account, yesShares);
                    self.noToken.read().transfer_vote(this, account, noShares);
                    self.yes_balance_by_account.write(account, 0);
                },
                TokenState::NO => {
                    let yesShares = self.getShare(false, account) * self.getYesBalance();
                    let noShares = self.getNoBalanceByAccount(account);
                    self.yesToken.read().transfer_vote(this, account, yesShares);
                    self.noToken.read().transfer_vote(this, account, noShares);
                    self.no_balance_by_account.write(account, 0);
                },
                TokenState::UNDEFINED => {
                    assert(false, 'Undefined token winner');
                }
            }
        }

        fn resolve(ref self: ContractState, token_winner: bool) {
            self.ownable.assert_only_owner();
            self.resolution.write(true);

            if token_winner {
                self.token_winner.write(TokenState::YES);
            } else {
                self.token_winner.write(TokenState::NO);
            }
        }

        fn is_resolved(self: @ContractState) -> bool {
            self.resolution.read()
        }
    }
}