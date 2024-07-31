import { Proposal } from "@/app/lib/definition";
import { setTimeout } from "timers/promises";


export default async function ProposalCards() {

    await setTimeout(5000);
	const proposalList: Array<Proposal> = [
		{
			onchain: {
				distributedFileSystemIdentifierCid: "cidPlaceholder",
				authorAddress: "authorAddressPlaceholder",
				status: 0,
				balanceYes: BigInt(1200),
				balanceNo: BigInt(30),
				adoptionPhaseStartTimeInSeconds: BigInt(99999999),
				adoptionSuccesCriterion: 88,
				successCriterionAchieved: false,
				oracleAddress: "oracleAddressPlaceholder",
			},
			ipfs: {
				title: "titlePlaceholder",
				overview: "overviewPlaceholder",
				externalLink: "externalLinkPlaceholder",
				tradingPhaseDurationInSeconds: BigInt(99999999999),
				adoptionPhaseDurationInSeconds: BigInt(99999999999999),
				adoptionSuccesCriterionDescription:
					"adoptionSuccesCriterionDescriptionPlaceholder",
			},
		},
	];

	return (
        <>
        { proposalList.map((proposal: Proposal) => {
            return(
                <div key={proposal.onchain.distributedFileSystemIdentifierCid}>
                    {proposal.ipfs.title}
                </div>
            )
        })}
        </>
    ) 
}
