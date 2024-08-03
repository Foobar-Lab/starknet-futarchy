use starknet::ContractAddress;

use snforge_std::{declare, ContractClassTrait};
use backend::governance::{ IGovernanceDispatcher, IGovernanceDispatcherTrait };
use backend::governance::Governance;

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


