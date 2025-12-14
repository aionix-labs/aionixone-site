import { Button } from '@aionixone/ui';
import { DOCS_URL } from '@/lib/constants';

export function Hero() {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-24 text-center">
      <div className="space-y-6">
        {/* Label */}
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
          Governance for Local Execution
        </p>

        {/* Main headline */}
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          The Control Plane for Local Execution
        </h1>

        {/* Sub-sub headline */}
        <p className="text-xl text-white/60">
          When scripts and cron jobs start running your business.
        </p>

        {/* Sub headline */}
        <p className="mx-auto max-w-2xl text-lg text-white/70">
          Unify scripts, functions, schedules, and legacy systems into a manageable, traceable rule
          system.
        </p>
      </div>

      {/* Bullets */}
      <div className="mx-auto flex max-w-2xl flex-col gap-3 text-left">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
          <p className="text-white/80">
            Every execution is traceable — no more guessing from logs
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
          <p className="text-white/80">
            No TRN, no execution — objects must be registered to exist
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
          <p className="text-white/80">
            System state is transferable — not locked in someone's head
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="primary">
          <a href="https://github.com/aionix-labs/aionixone-releases" target="_blank" rel="noreferrer">
            Download Community Edition
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={DOCS_URL}>Read Documentation</a>
        </Button>
      </div>
    </section>
  );
}
