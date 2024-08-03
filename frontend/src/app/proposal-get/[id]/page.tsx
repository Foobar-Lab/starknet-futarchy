import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	return (
		<main>
            PROPOSAL ({id})
		</main>
	);
}
