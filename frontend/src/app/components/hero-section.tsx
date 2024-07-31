import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

export default function HeroSection() {
	return (
		<div className="bg-secondary-500 h-auto grid grid-cols-6 px-32 pt-8">
			<div className="col-start-1 col-end-3 flex flex-col justify-around">
				<div className="text-white text-[32px] font-bold">
					Use the omniscience of the market to make your decisions.
				</div>
				<div>
					<Button color="primary">New Proposal</Button>
				</div>
			</div>
			<div className="flex items-end justify-end col-start-3 col-end-7">
				<Image
					className="opacity-effect"
					src="/sunset.png"
					width={500}
					alt="Picture of a sunset"
				/>
			</div>
		</div>
	);
}
