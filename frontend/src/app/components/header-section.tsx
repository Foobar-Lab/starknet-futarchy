import { Link, Button } from "@nextui-org/react";

export default function HeaderSection() {
	return (
		<div className="flex justify-between items-center mx-8 my-4">
			<Link className="logo text-4xl font-bold" href={"/"}>
				FutarchEth
			</Link>

			<Button color="primary" variant="ghost">Connect Wallet</Button>
		</div>
	);
}
