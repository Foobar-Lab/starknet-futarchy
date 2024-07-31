import HeroSection from "@/app/components/hero-section";
import ProposalCards from "@/app/components/proposal-cards";
import { Suspense } from "react";
import { ProposalCardsSkeleton } from "@/app/components/skeletons";

export default async function Home() {
	return (
		<>
			<HeroSection />
      <Suspense fallback={<ProposalCardsSkeleton />}>
        <ProposalCards />
      </Suspense>
		</>
	);
}
