export type ProposalCreateData = {
    oracleAddress: string;
    title: string;
    overview: string;
    externalLink: string;
    durationTradingPhaseInDays: number;
    durationAdoptionPhaseInDays: number;
    adoptionPhaseStartDate: number;
    adoptionSuccesCriterion: number;
    adoptionSuccesCriterionDescription: string;
};

export type ProposalGetData = {
    oracleAddress: string;
    title: string;
    overview: string;
    externalLink: string;
    durationTradingPhaseInDays: number;
    durationAdoptionPhaseInDays: number;
    adoptionPhaseStartDate: number;
    adoptionSuccessCriterion: number;
    adoptionSuccessCriterionDescription: string;
    distributedFileSystemIdentifierCID: string;
    status: number;
    balanceYes: bigint;
    balanceNo: bigint;
    successCriterionAchieved: boolean;
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