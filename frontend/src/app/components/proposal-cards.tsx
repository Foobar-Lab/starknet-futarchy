import { Proposal } from "@/app/lib/definition";
import { setTimeout } from "timers/promises";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Image} from "@nextui-org/react";
import React from "react";

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
		}
	];

    const isFollowed = false;

	return (
		<div className="flex">
			{proposalList.map((proposal: Proposal) => {
				return (
					<div
						key={
							proposal.onchain.distributedFileSystemIdentifierCid
						}
                        className="m-2"
					>
						<Card className="max-w-[340px]">
							<CardHeader className="justify-between">
								<div className="flex gap-5">
									<Avatar
										isBordered
										radius="full"
										size="md"
										src="https://nextui.org/avatars/avatar-1.png"
									/>
									<div className="flex flex-col gap-1 items-start justify-center">
										<h4 className="text-small font-semibold leading-none text-default-600">
											Zoey Lang
										</h4>
										<h5 className="text-small tracking-tight text-default-400">
											@zoeylang
										</h5>
									</div>
								</div>
								<Button
									className={
										isFollowed
											? "bg-transparent text-foreground border-default-200"
											: ""
									}
									color="primary"
									radius="full"
									size="sm"
									variant={isFollowed ? "bordered" : "solid"}
								>
									{isFollowed ? "Unfollow" : "Follow"}
								</Button>
							</CardHeader>
							<CardBody className="px-3 py-0 text-small h-24">
								<p>
									Frontend developer and UI/UX enthusiast.
									Join me on this coding adventure!
								</p>
								<span className="pt-2">
									#FrontendWithZoey
									<span
										className="py-2"
										aria-label="computer"
										role="img"
									>
										💻
									</span>
								</span>
							</CardBody>
							<CardFooter className="gap-3">
								<div className="flex gap-1">
									<p className="font-semibold text-default-400 text-small">
										4
									</p>
									<p className=" text-default-400 text-small">
										Following
									</p>
								</div>
								<div className="flex gap-1">
									<p className="font-semibold text-default-400 text-small">
										97.1K
									</p>
									<p className="text-default-400 text-small">
										Followers
									</p>
								</div>
							</CardFooter>
						</Card>
					</div>
				);
			})}
		</div>
	);
}
