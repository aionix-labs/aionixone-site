import { Card } from '@aionixone/ui';

const painPoints = [
  {
    title: 'Afraid to Debug',
    description: 'Something broke. You dig through logs, guess, ask around.'
  },
  {
    title: 'Afraid to Re-run',
    description: "Re-running might make it worse. So you don't."
  },
  {
    title: 'Afraid to Change',
    description: 'The system is frozen. Nobody dares to touch it.'
  },
  {
    title: 'Afraid to Hand Over',
    description: 'When someone leaves, the system becomes a black box.'
  }
];

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Sound Familiar?</p>
      </div>

      {/* Pain point cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {painPoints.map((point, index) => (
          <Card key={index} className="border-white/10 bg-white/5">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">{point.title}</h3>
              <p className="text-sm text-white/60">{point.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom copy */}
      <div className="mt-12 space-y-4 text-center">
        <p className="text-lg text-white/70">
          These systems aren't poorly written — they were just never truly governed.
        </p>
        <p className="text-white/50">
          And when all else fails, critical workflows are tracked in Excel.
        </p>
      </div>
    </section>
  );
}
