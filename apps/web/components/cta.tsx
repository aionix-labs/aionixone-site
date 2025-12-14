import { Button } from '@aionixone/ui';
import { docsUrl } from '@/lib/constants';

export function CallToAction() {
  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent px-10 py-16 text-center">
      {/* Title */}
      <h2 className="text-3xl font-semibold">From Chaos to Order</h2>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-white/70">
        Single binary. Runs locally. Up in five minutes.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="primary">
          <a href="https://github.com/aionix-labs/aionixone-releases" target="_blank" rel="noreferrer">
            Download Community Edition
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={docsUrl('/getting-started')}>Read Quick Start Guide</a>
        </Button>
      </div>

      {/* Reassurance */}
      <p className="mt-6 text-sm text-white/50">
        No cloud required. No agents. No rewriting.
      </p>
    </section>
  );
}
