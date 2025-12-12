import { Card } from '@aionixone/ui';
import { services } from '@/content/services';

export function ServiceGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80">Services</p>
        <h2 className="text-3xl font-semibold tracking-tight">Six cores inside the binary</h2>
        <p className="text-white/70">
          Each surface shares the same TRN schema and executor bus so workflows, functions, triggers,
          and connectors interoperate without glue code.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.name} className="h-full bg-white/5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{service.category}</p>
              <h3 className="text-2xl font-medium">{service.name}</h3>
              <p className="text-sm text-white/70">{service.description}</p>
              <p className="text-xs font-mono text-white/50">{service.trn}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
