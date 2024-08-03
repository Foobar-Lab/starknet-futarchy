import { Proposal, ProposalStatusLabel } from "@/app/lib/definition";

export function formatAddress(address: string) {
	return address.slice(0, 4) + "..." + address.slice(-4);
}

export function formatVolume(volume: bigint) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
	return formatter.format(volume);
}

export function getVolumeLabel(proposal: Proposal) {
	let volume = proposal.onChain.balanceYes + proposal.onChain.balanceYes;
	let volumeLabel = formatVolume(volume) + " STRK";
	return volumeLabel;
}

export function getStatusLabel(proposal: Proposal) {
	let statusLabel = ProposalStatusLabel[proposal.onChain.status];
	return statusLabel;
}

export function getAuthorAddressLabel(proposal: Proposal) {
	return formatAddress(proposal.onChain.authorAddress);
}
