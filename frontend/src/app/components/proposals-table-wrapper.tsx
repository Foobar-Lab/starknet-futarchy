import { Proposal } from "@/app/lib/definition";
import { setTimeout } from "timers/promises";
import ProposalsTable from "@/app/components/proposals-table"
import React from "react";

export default async function ProposalsTableWrapper() {
	await setTimeout(1000);
	const proposals: Array<Proposal> = [
		{
			onChain: {
				distributedFileSystemIdentifierCid: "cidPlaceholder1",
				authorAddress: "0x060c955a185302957acd7cbcbd8a60c613afe30068c6140be5e3627c30cd4c85",
				status: 0,
				balanceYes: BigInt(1200),
				balanceNo: BigInt(30),
				adoptionPhaseStartTimeInSeconds: BigInt(99999999),
				adoptionSuccesCriterion: 88,
				successCriterionAchieved: false,
				oracleAddress: "oracleAddressPlaceholder",
				tradingPhaseDurationInSeconds: BigInt(99999999999),
				adoptionPhaseDurationInSeconds: BigInt(99999999999999),
				adoptionSuccesCriterionDescription:
					"adoptionSuccesCriterionDescriptionPlaceholder"
			},
			ipfs: {
				title: "Partnering with artists to launch a new line of our best-selling product.",
				overview: "As a company, our goal is to achieve a 5% increase in turnover within the next year by enhancing our product offerings, We are committed to implementing strategic initiatives that will drive growth and deliver value to our stakeholders. That is why we want to partner with artists to launch a new line of our best-selling product.",
				externalLink: "https://"
			},
		},
		{
			onChain: {
				distributedFileSystemIdentifierCid: "cidPlaceholder2",
				authorAddress: "0x00a9651e29b175aa3da6b2a3f1ab37381f977aeb77ef8a107e2dd7d69bf44921",
				status: 0,
				balanceYes: BigInt(150000),
				balanceNo: BigInt(35000),
				adoptionPhaseStartTimeInSeconds: BigInt(99999999),
				adoptionSuccesCriterion: 88,
				successCriterionAchieved: false,
				oracleAddress: "oracleAddressPlaceholder",
				tradingPhaseDurationInSeconds: BigInt(99999999999),
				adoptionPhaseDurationInSeconds: BigInt(99999999999999),
				adoptionSuccesCriterionDescription: "adoptionSuccesCriterionDescriptionPlaceholder"
			},
			ipfs: {
				title: "Lay off 10% of employees to reduce debt by 30%.",
				overview: "overviewPlaceholder",
				externalLink: "externalLinkPlaceholder",
			}
		},
		{
			onChain: {
				distributedFileSystemIdentifierCid: "cidPlaceholder3",
				authorAddress: "0x07fbc612fb6a05897c063d03d7e19efdba236596baf310a38df7248a6557130f",
				status: 0,
				balanceYes: BigInt(140),
				balanceNo: BigInt(20),
				adoptionPhaseStartTimeInSeconds: BigInt(99999999),
				adoptionSuccesCriterion: 88,
				successCriterionAchieved: false,
				oracleAddress: "oracleAddressPlaceholder",
				tradingPhaseDurationInSeconds: BigInt(99999999999),
				adoptionPhaseDurationInSeconds: BigInt(99999999999999),
				adoptionSuccesCriterionDescription:
					"adoptionSuccesCriterionDescriptionPlaceholder"
			},
			ipfs: {
				title: "Add 1000 km of cycle paths in Paris to reduce CO2 emissions by 2% in 1 year.",
				overview: "overviewPlaceholder",
				externalLink: "externalLinkPlaceholder"
			}
		},
		{
			onChain: {
				distributedFileSystemIdentifierCid: "cidPlaceholder4",
				authorAddress: "0x03c3f3cfdf82aa01f08fe02c84e051836afd3b0b51245d918f0032b27f63c703",
				status: 0,
				balanceYes: BigInt(5600),
				balanceNo: BigInt(10765),
				adoptionPhaseStartTimeInSeconds: BigInt(99999999),
				adoptionSuccesCriterion: 88,
				successCriterionAchieved: false,
				oracleAddress: "oracleAddressPlaceholder",
				tradingPhaseDurationInSeconds: BigInt(99999999999),
				adoptionPhaseDurationInSeconds: BigInt(99999999999999),
				adoptionSuccesCriterionDescription:
					"adoptionSuccesCriterionDescriptionPlaceholder"
			},
			ipfs: {
				title: "Allocate 30% of tokens to the first contributors of the ecosystem (developers, designers, marketers).",
				overview: "overviewPlaceholder",
				externalLink: "externalLinkPlaceholder"
			}
		},
	];

	const isFollowed = false;

	return (
		<ProposalsTable proposals={proposals}/>
	);
}
