"use client"

import { Link, Button, Image } from "@nextui-org/react";
import React from 'react';
import Typed from 'typed.js';

export default function HeroSection() {

	// Create reference to store the DOM element containing the animation
	const el = React.useRef(null);

	React.useEffect(() => {
	const typed = new Typed(el.current, {
		strings: ["Use the omniscience of the market to make your decisions.", "Use your expertise to generate profit."],
		typeSpeed: 50,
		loop: true,
		backSpeed: 50,
		backDelay: 2500
	});

	return () => {
		// Destroy Typed instance during cleanup to stop animation
		typed.destroy();
	};
	}, []);

	return (
		<div className="bg-secondary-500 h-auto grid grid-cols-6 px-32 pt-8">
			<div className="col-start-1 col-end-3 flex flex-col justify-around">
				<div className="text-white text-[32px] font-medium min-h-36">
					<span ref={el}></span>
				</div>
				<div className="mb-8">
					<Link href={"/proposal-create"}>
						<Button color="primary">New Proposal</Button>
					</Link>
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
