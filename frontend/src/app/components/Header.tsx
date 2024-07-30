import { Link } from "@nextui-org/link";
import {Button} from '@nextui-org/button'; 

export const Header = () => {
	return (
		<div className="flex justify-between items-center mx-8 my-4">
            <Link className="bg-gradient-to-r from-primary-500" href={"/"}>
                FutarchEth
            </Link>

            <Button color="primary">Connect Wallet</Button>
		</div>
	);
};
