export type ProposalCreateOnChain = {
	distributedFileSystemIdentifierCID: string;
};

export type ProposalGetOnChain = {
	distributedFileSystemIdentifierCID: string;
	status: number;
	balanceYes: bigint;
	balanceNo: bigint;
	successCriterionAchieved: boolean;
};

export type ProposalIPFS = {
	oracleAddress: string;
	title: string;
	overview: string;
	externalLink: string;
	tradingPhaseDurationInDays: number;
	adoptionPhaseDurationInDays: number;
	adoptionSuccesCriterion: number;
	adoptionSuccesCriterionDescription: string;
};

export const ProposalStatus = {
	WaitingBeforeTradingPhase: 0,
	TradingPhaseStarted: 1,
	ProposalRefused: 2,
	ProposalAccepted: 3,
	VoteClosed: 4,
};

export const ProposalStatusLabel = [
	"PENDING",
	"TRADING",
	"REFUSED",
	"ACCEPTED",
	"CLOSED",
];