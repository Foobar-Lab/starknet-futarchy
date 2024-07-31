export type ProposalCreateOnChain = {
	distributedFileSystemIdentifierCid: string;
};

export type ProposalGetOnChain = {
	distributedFileSystemIdentifierCid: string;
    authorAddress: string;
	status: number;
	balanceYes: bigint;
	balanceNo: bigint;
    adoptionPhaseStartTimeInSeconds: bigint; 
    adoptionSuccesCriterion: number;
	successCriterionAchieved: boolean;
    oracleAddress: string;
};

export type ProposalIpfs = {
	title: string;
	overview: string;
	externalLink: string;
	tradingPhaseDurationInSeconds: bigint;
	adoptionPhaseDurationInSeconds: bigint;
	adoptionSuccesCriterionDescription: string;
};

export type Proposal = {
	onchain: ProposalGetOnChain;
	ipfs: ProposalIpfs;
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