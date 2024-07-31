import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

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
