'use client';

export function GovernanceRules() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">How Governance Works</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Three Rules. Zero Exceptions.</h2>
      </div>

      {/* Rules */}
      <div className="space-y-6">
        {/* Rule 1: Identity */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-semibold text-cyan-400">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white">Identity</h3>
              <p className="mt-2 text-white/70">
                Every object has a TRN. No TRN = doesn&apos;t exist.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4">
                <pre className="font-mono text-sm">
                  <span className="text-white/50">trn:</span>
                  <span className="text-cyan-400">&#123;service&#125;</span>
                  <span className="text-white/50">:</span>
                  <span className="text-purple-400">&#123;tenant&#125;</span>
                  <span className="text-white/50">:</span>
                  <span className="text-green-400">&#123;path&#125;</span>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 2: Operation */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-semibold text-cyan-400">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white">Operation</h3>
              <p className="mt-2 text-white/70">
                Every action is TRN + Operation. No ambiguity. No magic.
              </p>
              <div className="mt-4 space-y-2 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
                <div>
                  <span className="text-white/60">trn:stepflow:default:workflow/order-pipeline</span>
                  <span className="text-white/30"> → </span>
                  <span className="text-cyan-400">RUN</span>
                </div>
                <div>
                  <span className="text-white/60">trn:aionixfn:default:function/orders/validate</span>
                  <span className="text-white/30"> → </span>
                  <span className="text-purple-400">INVOKE</span>
                </div>
                <div>
                  <span className="text-white/60">trn:credvault:default:credential/apiKey/stripe-key</span>
                  <span className="text-white/30"> → </span>
                  <span className="text-green-400">READ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 3: Record */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-semibold text-cyan-400">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white">Record</h3>
              <p className="mt-2 text-white/70">
                Every execution generates a record. Input. Output. Duration. Status.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4">
                <pre className="font-mono text-sm text-white/80">
{`{
  "execution_id": "exec_a1b2c3",
  "trn": "trn:stepflow:default:workflow/order-pipeline",
  "started_at": "2025-01-15T09:00:00Z",
  "duration_ms": 3420,
  "status": "completed",
  "steps": 5,
  "events": 12
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
