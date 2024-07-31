export type ProposalCreateOnChain = {
	distributedFileSystemIdentifierCID: string;
};

export type ProposalGetOnChain = {
	distributedFileSystemIdentifierCID: string;
	status: number;
	balanceYes: bigint;
	balanceNo: bigint;
    adoptionPhaseStartTimeInSeconds: bigint; 
	successCriterionAchieved: boolean;
    oracleAddress: string;
};

export type ProposalIPFS = {
	title: string;
	overview: string;
	externalLink: string;
	tradingPhaseDurationInSeconds: bigint;
	adoptionPhaseDurationInSeconds: bigint;
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