import { Link } from "@nextui-org/link";
import {Button} from '@nextui-org/button'; 
import {Image} from "@nextui-org/image";

export const Hero = () => {
	return (
		<div className="bg-secondary-500 h-auto flex justify-between px-8 pt-8 pb-4">
            <div className="text-white text-3xl font-medium">
                Choose a goal and reach it with community
			</div>
            <div className="flex items-end">
            <Image
                src="/sunset.png"
                height={300}
                alt="Picture of a sunset"
            />
            </div>
		</div>
	);
};
