'use client';

const antiFeatures = [
  {
    title: 'Not a cloud platform',
    description: 'Runs locally, no data leaves your network'
  },
  {
    title: 'Not a CI/CD tool',
    description: "Doesn't build or deploy your code"
  },
  {
    title: 'Not a monitoring system',
    description: "Doesn't collect metrics or send alerts"
  },
  {
    title: 'Not a replacement',
    description: "Wraps your existing scripts, doesn't rewrite them"
  }
];

export function AntiFeatures() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">What We Don&apos;t Do</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Governance, Not Everything</h2>
      </div>

      {/* List */}
      <div className="space-y-4">
        {antiFeatures.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4"
          >
            <span className="mt-0.5 text-lg text-white/30">✕</span>
            <div>
              <span className="font-medium text-white">{item.title}</span>
              <span className="text-white/50"> — {item.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Closing line */}
      <p className="mt-8 text-center text-white/60">
        AionixOne does one thing: govern what executes. Everything else is your choice.
      </p>
    </section>
  );
}
