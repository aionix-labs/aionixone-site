'use client';

const benefits = [
  {
    title: 'Debug',
    before: 'Dig through logs, guess, ask around.',
    after: 'Every execution has a traceable record.'
  },
  {
    title: 'Re-run',
    before: "Afraid it might make things worse.",
    after: 'Safe replay with full context.'
  },
  {
    title: 'Change',
    before: 'Frozen system, nobody dares touch.',
    after: 'Clear dependencies, safe modifications.'
  },
  {
    title: 'Hand Over',
    before: 'Black box when someone leaves.',
    after: 'Self-documenting, transferable system.'
  }
];

export function GovernanceBenefits() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
          What Governance Gives You
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">From Chaos to Clarity</h2>
      </div>

      {/* Benefits Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20"
          >
            <h3 className="text-lg font-medium text-white">{benefit.title}</h3>

            {/* Before */}
            <div className="mt-4">
              <span className="text-xs font-medium uppercase tracking-wider text-red-400/80">
                Before
              </span>
              <p className="mt-1 text-sm text-white/50 line-through decoration-white/20">
                {benefit.before}
              </p>
            </div>

            {/* After */}
            <div className="mt-3">
              <span className="text-xs font-medium uppercase tracking-wider text-green-400/80">
                After
              </span>
              <p className="mt-1 text-sm text-white/80">{benefit.after}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
