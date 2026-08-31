'use client';

import { NightHero } from '@/components/solutions-landing/NightHero';
import { ServiceRoster } from '@/components/solutions-landing/ServiceRoster';
import { CapabilityStrips } from '@/components/solutions-landing/CapabilityStrips';
import { FacilityTiles } from '@/components/solutions-landing/FacilityTiles';
import { MaterialList } from '@/components/solutions-landing/MaterialList';
import { PartnerWall } from '@/components/solutions-landing/PartnerWall';
import { ProposalForm } from '@/components/solutions-landing/ProposalForm';
import { LandingFooter } from '@/components/solutions-landing/LandingFooter';

export function SolutionsLanding() {
	return (
		<div className="relative bg-void text-inklit antialiased">
			{/* Signature: the energized busbar linking hero to the proposal form.
			 * A fixed phase-blue rail with one travelling volt pulse; content
			 * sections hang off it as live loads. Hidden on small screens. */}
			<div
				className="pointer-events-none fixed inset-y-0 left-6 z-30 hidden md:block xl:left-12"
				aria-hidden
			>
				<div className="busbar" />
			</div>

			<div className="md:pl-10 xl:pl-16">
				<NightHero />
				<ServiceRoster />
				<CapabilityStrips />
				<FacilityTiles />
				<MaterialList />
				<PartnerWall />
				<ProposalForm />
				<LandingFooter />
			</div>
		</div>
	);
}
