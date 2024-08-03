"use client";

import { Proposal, ProposalStatusLabel } from "@/app/lib/definition";
import { setTimeout } from "timers/promises";
import {
	Button,
	Dropdown,
	DropdownTrigger, 
	DropdownMenu,
	DropdownItem,
	Input,
	Link,
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/react";
import React from "react";
import {getVolumeLabel, getStatusLabel, getAuthorAddressLabel} from "@/app/lib/utils";

interface ProposalsTableProps {
	proposals: Proposal[];
}

const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 24 24"
		width="1em"
		{...otherProps}
	>
		<path
		d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeMiterlimit={10}
		strokeWidth={strokeWidth}
		/>
	</svg>
);

export const SearchIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default function ProposalsTable(props: ProposalsTableProps) {

	const [statusFilter, setStatusFilter] = React.useState("all");

	return (
		<>
			<div className="flex justify-end gap-x-2 mb-4">
				<Input
					isClearable
					className="w-full sm:max-w-[33%]"
					placeholder="Search by author address..."
					startContent={<SearchIcon />}
					// value={filterValue}
					// onClear={() => onClear()}
					// onValueChange={onSearchChange}
				/>
				<Dropdown>
					<DropdownTrigger className="hidden sm:flex">
						<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
							Status
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						disallowEmptySelection
						aria-label="Table Columns"
						closeOnSelect={false}
						selectedKeys={statusFilter}
						selectionMode="multiple"
						// onSelectionChange={setStatusFilter}
					>
						{ProposalStatusLabel.map((status) => (
						<DropdownItem key={status} className="capitalize">
							{status}
						</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger className="hidden sm:flex">
						<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
							Sort by
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						disallowEmptySelection
						aria-label="Table Columns"
						closeOnSelect={false}
						selectedKeys={statusFilter}
						selectionMode="multiple"
						// onSelectionChange={setStatusFilter}
					>
						<DropdownItem className="capitalize">
							Volume
						</DropdownItem>
						<DropdownItem className="capitalize">
							Date
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<div>
				<Table aria-label="Example static collection table">
					<TableHeader>
						<TableColumn>Proposal</TableColumn>
						<TableColumn>Author</TableColumn>
						<TableColumn>Status</TableColumn>
						<TableColumn>Volume</TableColumn>
					</TableHeader>
					<TableBody>
						{props.proposals.map((proposal) => {
							return (
								<TableRow
									key={
										proposal.onChain
											.distributedFileSystemIdentifierCid
									}
								>
									<TableCell>
										<Link color="foreground" href={"/proposal-get/" + proposal.onChain.distributedFileSystemIdentifierCid}>
											{proposal.ipfs.title}
										</Link>
									</TableCell>
									<TableCell>{getAuthorAddressLabel(proposal)}</TableCell>
									<TableCell>{getStatusLabel(proposal)}</TableCell>
									<TableCell>{getVolumeLabel(proposal)}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
