const rules = [
  {
    number: '1',
    rule: 'All objects must have a TRN',
    description: "Functions, credentials, schedules, workflows — no TRN means it doesn't exist"
  },
  {
    number: '2',
    rule: 'All actions are TRN + Operation',
    description: 'Invoke, trigger, modify — one unified pattern'
  },
  {
    number: '3',
    rule: 'All executions generate a record',
    description: 'Traceable, replayable, auditable'
  }
];

export function SolutionSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
          One Rule to Govern Them All
        </p>
      </div>

      {/* Positioning statement */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-lg text-white/70">
          AionixOne doesn't add another tool.
          <br />
          It defines what is allowed to exist and execute.
        </p>
      </div>

      {/* TRN subtitle */}
      <div className="mb-8 text-center">
        <p className="font-mono text-sm text-white/50">TRN — Tenant Resource Name</p>
      </div>

      {/* Three rules */}
      <div className="grid gap-6 md:grid-cols-3">
        {rules.map((item) => (
          <div
            key={item.number}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 font-mono text-lg text-cyan-400">
              {item.number}
            </div>
            <h3 className="mb-2 font-medium text-white">{item.rule}</h3>
            <p className="text-sm text-white/60">{item.description}</p>
          </div>
        ))}
      </div>

      {/* TRN structure */}
      <div className="mt-12 text-center">
        <div className="inline-block rounded-xl border border-white/10 bg-black/40 px-6 py-4">
          <code className="font-mono text-cyan-400">
            trn:&#123;service&#125;:&#123;tenant&#125;:&#123;path&#125;
          </code>
        </div>
      </div>

      {/* Bottom emphasis */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-white/80">
          Anything that can execute must be governed.
        </p>
      </div>
    </section>
  );
}
