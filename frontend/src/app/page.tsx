import HeroSection from "@/app/components/hero-section";
import ProposalCards from "@/app/components/proposal-cards";
import { Suspense } from "react";
import { ProposalCardSkeleton } from "@/app/components/skeletons";

export default async function Home() {
	return (
		<>
			<HeroSection />
      <div className="m-8">
      <Suspense fallback={<ProposalCardSkeleton />}>
        <ProposalCards />
      </Suspense>
      </div>
		</>
	);
}
