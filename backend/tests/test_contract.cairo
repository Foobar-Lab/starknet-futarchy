use core::option::OptionTrait;
use starknet::ContractAddress;

use starknet::contract_address_const;

use snforge_std::{declare, ContractClassTrait};
use backend::governance::{ IGovernanceDispatcher, IGovernanceDispatcherTrait };
use backend::governance::Governance;
use backend::market::{ IMarketDispatcher, IMarketDispatcherTrait };
use backend::yestoken::{IYesTokenDispatcher, IYesTokenDispatcherTrait};
use backend::notoken::{INoTokenDispatcher, INoTokenDispatcherTrait};

#[test]
#[available_gas(2000000000)]
fn test_create_proposal() {
    let contract = declare("Governance").unwrap();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();

    let dispatcher = IGovernanceDispatcher { contract_address };

    let oracleAddress: ContractAddress = 'oracletest'.try_into().unwrap();
    let marketAddress: ContractAddress = 'markettest'.try_into().unwrap();
    dispatcher.createProposal('hashfortest', 3600, 7200, oracleAddress, marketAddress);
    let proposal = dispatcher.getProposalById(0);
    assert(proposal.distributedFileSystemIdentifier == 'hashfortest', 'Invalid cid');
    assert(proposal.marketAddress == marketAddress, 'Invalid market');
    assert(proposal.oracleAddress == oracleAddress, 'Invalid oracle');
    assert(proposal.tradingPhaseDurationInSeconds == 3600, 'Invalid tradingPhase');
    assert(proposal.adoptionPhaseDurationInSeconds == 7200, 'Invalid adoptionPhase');
}

#[test]
#[available_gas(2000000000)]
fn test_get_proposals_from_author() {
    let contract = declare("Governance").unwrap();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();

    let dispatcher = IGovernanceDispatcher { contract_address };

    let oracleAddress: ContractAddress = 'oracletest'.try_into().unwrap();
    let marketAddress: ContractAddress = 'markettest'.try_into().unwrap();
    dispatcher.createProposal('hashfortest', 3600, 7200, oracleAddress, marketAddress);
    dispatcher.createProposal('hashfortest2', 4800, 9600, oracleAddress, marketAddress);

    let author = dispatcher.getProposalById(0).authorAddress;
    let author2 = dispatcher.getProposalById(1).authorAddress;
    assert(author == author2, 'Author issue');

    let arrayOfProposal = dispatcher.getAuthorProposals(author);
    assert(arrayOfProposal.len() == 2, 'Length issue');

}

#[test]
#[available_gas(2000000000)]
fn test_market() {
    let contractYesToken = declare("YesToken").unwrap();
    let contractNoToken = declare("NoToken").unwrap();

    let (yesTokenAddress, _) = contractYesToken.deploy(@array![]).unwrap();
    let (noTokenAddress, _) = contractNoToken.deploy(@array![]).unwrap();

    let contractMarket = declare("Market").unwrap();
    // Contructor arguments
    let mut constructor_calldata: Array::<felt252> = array![yesTokenAddress.into(), noTokenAddress.into()];
    let (contract_address, _) = contractMarket.deploy(@constructor_calldata).unwrap();     

    let market_dispatcher = IMarketDispatcher { contract_address };
    let initialYesBalance = market_dispatcher.getYesBalance();
    let initialNoBalance = market_dispatcher.getNoBalance();
    assert(initialYesBalance == 0, 'Yes balance should be 0');
    assert(initialNoBalance == 0, 'No balance should be 0');
    assert(market_dispatcher.is_resolved() == false, 'Market sdnt be resolved');

    let bobAccount = contract_address_const::<'bob'>();
    let lizAccount = contract_address_const::<'liz'>();
    market_dispatcher.buy(bobAccount, true, 10);
    market_dispatcher.buy(lizAccount, false, 30);
    assert(market_dispatcher.getYesBalance() == 10, 'Yes balance should be 10');
    assert(market_dispatcher.getNoBalance() == 30, 'Yes balance should be 30');
    assert(market_dispatcher.getYesBalanceByAccount(bobAccount) == 10, 'Bob sd have 10 yes');
    assert(market_dispatcher.getYesBalanceByAccount(lizAccount) == 0, 'Liz sd have 0 yes');
    assert(market_dispatcher.getNoBalanceByAccount(bobAccount) == 0, 'Bob sd have 0 no');
    assert(market_dispatcher.getNoBalanceByAccount(lizAccount) == 30, 'Liz sd have 30 no');

    market_dispatcher.resolve(true);
    assert(market_dispatcher.is_resolved() == true, 'Market sd be resolved');
    assert(market_dispatcher.getShare(true, bobAccount) == 1, 'Bobs share sd be 1');
    assert(market_dispatcher.getShare(true, lizAccount) == 0, 'Lizs share sd be 0');

    market_dispatcher.withdraw(bobAccount);
    assert(market_dispatcher.getYesBalanceByAccount(bobAccount) == 0, 'Bob sd have 0 yes');
}
