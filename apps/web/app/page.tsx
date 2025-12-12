import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ProblemSection } from '@/components/problem-section';
import { SolutionSection } from '@/components/solution-section';
import { ProofSection } from '@/components/proof-section';
import { CallToAction } from '@/components/cta';

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        {/* 1. Hero - Core proposition */}
        <Hero />

        {/* 2. Problem - Pain point resonance */}
        <ProblemSection />

        {/* 3. Solution - TRN rule system */}
        <SolutionSection />

        {/* 4. Proof - Product screenshots */}
        <ProofSection />

        {/* 5. CTA - Call to action */}
        <div className="px-6 pb-24">
          <CallToAction />
        </div>
      </main>
    </div>
  );
}
