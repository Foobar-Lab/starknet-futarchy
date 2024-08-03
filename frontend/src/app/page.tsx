import HeroSection from "@/app/components/hero-section";
import ProposalsTableWrapper from "@/app/components/proposals-table-wrapper";
import { Suspense } from "react";
import { ProposalsTableSkeleton } from "@/app/components/skeletons";

export default async function Home() {
	return (
		<>
			<HeroSection />
      <div className="m-8">
        <Suspense fallback={<ProposalsTableSkeleton />}>
          <ProposalsTableWrapper/>
        </Suspense>
      </div>
		</>
	);
}
