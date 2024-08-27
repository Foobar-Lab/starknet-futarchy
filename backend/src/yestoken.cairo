use starknet::ContractAddress;

#[starknet::interface]
pub trait IYesToken<TContractState> {
    fn mint(ref self: TContractState, supply: u256, recipient: ContractAddress);
    fn transfer_vote(ref self: TContractState, from: ContractAddress, to: ContractAddress, amount: u256);
    fn total_votes(self: @TContractState) -> u256;
    fn balance_of_account(self: @TContractState, account: ContractAddress) -> u256;
}
#[starknet::contract]
mod YesToken {
    use openzeppelin::token::erc20::erc20::ERC20Component::InternalTrait;
use openzeppelin::token::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use starknet::ContractAddress;

    
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    // ERC20 Mixin
    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    #[constructor]
    fn constructor(
        ref self: ContractState
    ) {
        let name = "YesToken";
        let symbol = "YES";

        self.erc20.initializer(name, symbol);
    }

    #[abi(embed_v0)]
    impl YesTokenImpl of super::IYesToken<ContractState> {
        fn mint(ref self: ContractState, supply: u256, recipient: ContractAddress) {
            self.erc20.mint(recipient, supply);
        }

        fn transfer_vote(ref self: ContractState, from: ContractAddress, to: ContractAddress, amount: u256) {
            self.erc20.approve(from, amount);
            self.erc20.transfer_from(from, to, amount);
        }

        fn total_votes(self: @ContractState) -> u256 {
            self.erc20.total_supply()
        }

        fn balance_of_account(self: @ContractState, account: ContractAddress) -> u256 {
            self.erc20.balance_of(account)
        }
    }
}