import { Header } from '@/components/header';
import { GovernedResources } from '@/components/governed-resources';
import { GovernanceRules } from '@/components/governance-rules';
import { GovernanceBenefits } from '@/components/governance-benefits';
import { StudioPreview } from '@/components/studio-preview';
import { AntiFeatures } from '@/components/anti-features';

export default function FeaturesPage() {
  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16 text-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Features</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              How Governance Works
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Six resource types. Three rules. Complete traceability.
            </p>
          </div>
        </section>

        {/* What Is Governed */}
        <GovernedResources />

        {/* How Governance Works */}
        <GovernanceRules />

        {/* What Governance Gives You */}
        <GovernanceBenefits />

        {/* Studio Preview */}
        <StudioPreview />

        {/* What We Don't Do */}
        <AntiFeatures />

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-12">
            <h2 className="mb-4 text-2xl font-semibold">Ready to Govern?</h2>
            <p className="mb-8 text-white/70">
              Single binary. No cloud required. Up in five minutes.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/aionixone/aionixone/releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
              >
                Download Community Edition
              </a>
              <a
                href="/docs"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/60"
              >
                Read the Docs
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
