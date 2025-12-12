'use client';

const resources = [
  {
    name: 'Functions',
    icon: 'λ',
    description: 'Python and Deno functions with isolated execution',
    trn: 'trn:aionixfn:acme:fn/process-order',
    color: 'cyan'
  },
  {
    name: 'Workflows',
    icon: '⎇',
    description: 'Multi-step orchestration with JSON DSL',
    trn: 'trn:stepflow:acme:wf/daily-report',
    color: 'purple'
  },
  {
    name: 'Triggers',
    icon: '⚡',
    description: 'Cron schedules, webhooks, and event sources',
    trn: 'trn:igniter:acme:trigger/every-hour',
    color: 'yellow'
  },
  {
    name: 'Connectors',
    icon: '⌁',
    description: 'Database, API, and MCP integrations',
    trn: 'trn:openact:acme:conn/postgres-main',
    color: 'green'
  },
  {
    name: 'Secrets',
    icon: '🔐',
    description: 'Encrypted credentials with scoped access',
    trn: 'trn:credvault:acme:secret/api-key',
    color: 'red'
  },
  {
    name: 'Parameters',
    icon: '⚙',
    description: 'Hierarchical configuration values',
    trn: 'trn:paramstore:acme:param/batch-size',
    color: 'blue'
  }
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' }
};

export function GovernedResources() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">What Is Governed</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Everything That Executes</h2>
        <p className="mt-4 text-white/60">
          Six resource types. One addressing scheme. Complete governance.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => {
          const colors = colorClasses[resource.color];
          return (
            <div
              key={resource.name}
              className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 transition-all hover:border-white/20`}
            >
              {/* Icon and name */}
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${colors.text}`}>{resource.icon}</span>
                <h3 className="text-lg font-medium text-white">{resource.name}</h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-white/60">{resource.description}</p>

              {/* TRN example */}
              <div className="mt-4 overflow-hidden rounded-lg bg-black/30 px-3 py-2">
                <code className={`text-xs ${colors.text} break-all`}>{resource.trn}</code>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
