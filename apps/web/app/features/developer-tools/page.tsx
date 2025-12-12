import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta
} from '@/components/feature-page';
import { features, codeExamples } from '@/content/features';

export default function DeveloperToolsPage() {
  const feature = features['developer-tools'];
  const code = codeExamples['developer-tools'];

  return (
    <div>
      <Header />
      <main>
        {/* Hero */}
        <FeatureHero
          icon={<span>{feature.icon}</span>}
          label={feature.label}
          headline={feature.headline}
          description={feature.description}
          primaryCta={{ label: 'Get Started', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'CLI Reference', href: '/docs/reference/cli' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* Three Tools Overview */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl">💻</div>
              <h3 className="mb-2 text-xl font-semibold">CLI (aio)</h3>
              <p className="mb-3 text-sm text-white/60">
                Full-featured command-line interface for automation, scripting, and CI/CD integration.
              </p>
              <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                Stable
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl">🎨</div>
              <h3 className="mb-2 text-xl font-semibold">Studio</h3>
              <p className="mb-3 text-sm text-white/60">
                Web-based visual interface for workflow design, monitoring, and debugging.
              </p>
              <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                Beta
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl">📝</div>
              <h3 className="mb-2 text-xl font-semibold">VS Code</h3>
              <p className="mb-3 text-sm text-white/60">
                IDE extension with syntax highlighting, IntelliSense, and deployment commands.
              </p>
              <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                Beta
              </span>
            </div>
          </div>
        </section>

        {/* CLI */}
        <FeatureDetail
          label="Command Line"
          headline="Powerful CLI for Every Task"
          description="The aio CLI covers all six services with consistent patterns. Deploy functions, create triggers, run workflows, and manage secrets — all from your terminal."
          bullets={[
            'Consistent command patterns across services',
            'Multiple output formats (table, json, yaml)',
            'Shell completion for bash, zsh, fish',
            'Context switching for multiple environments'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`aio fn    # Functions
aio wf    # Workflows
aio tr    # Triggers
aio act   # Connectors
aio sec   # Secrets
aio param # Parameters

# Switch environments
aio context use production
aio context use staging`}
              </pre>
            </div>
          }
        />

        {/* Studio */}
        <FeatureDetail
          label="Visual Editor"
          headline="Design Workflows Visually"
          description="Drag-and-drop workflow design with real-time DSL synchronization. See your workflow execute step by step. Debug failures with full execution traces."
          bullets={[
            'Drag-and-drop canvas',
            'Real-time JSON DSL sync',
            'Execution monitoring',
            'Step-by-step debugging'
          ]}
          visual={
            <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 text-4xl">🎨</div>
                <p className="text-white/40">Studio Screenshot</p>
                <p className="text-sm text-white/30">Drag-and-drop workflow editor</p>
              </div>
            </div>
          }
          reverse
        />

        {/* VS Code */}
        <FeatureDetail
          label="IDE Integration"
          headline="Code with Full Support"
          description="Write workflow DSL, function code, and trigger configurations with full IDE support. Syntax highlighting, validation, and deployment without leaving your editor."
          bullets={[
            'Syntax highlighting for YAML/JSON',
            'Schema validation and IntelliSense',
            'Deploy commands in command palette',
            'Log viewer in output panel'
          ]}
          visual={
            <div className="space-y-3">
              {[
                { pattern: '*.aionix.yaml', type: 'AionixOne resource' },
                { pattern: 'function.yaml', type: 'Function definition' },
                { pattern: 'trigger.yaml', type: 'Trigger definition' },
                { pattern: 'workflow.json', type: 'Workflow DSL' }
              ].map((file) => (
                <div
                  key={file.pattern}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                >
                  <code className="text-cyan-400">{file.pattern}</code>
                  <span className="text-sm text-white/50">{file.type}</span>
                </div>
              ))}
            </div>
          }
        />

        {/* Interactive Dashboard */}
        <FeatureDetail
          label="Terminal UI"
          headline="Interactive Dashboard"
          description="Monitor your runtime without leaving the terminal. Real-time status, recent executions, and service health at a glance."
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`┌─────────────────────────────────────────────┐
│  AionixOne Dashboard           [localhost]  │
├─────────────────────────────────────────────┤
│  Functions: 12    Triggers: 8    Active: 3  │
├─────────────────────────────────────────────┤
│  Recent Executions                          │
│  ● order-flow    completed   12:00:00       │
│  ○ daily-sync    running     11:55:00       │
│  ✗ data-etl      failed      11:50:00       │
└─────────────────────────────────────────────┘`}
              </pre>
            </div>
          }
          reverse
        />

        {/* Code Example */}
        <CodeExample
          title="Common CLI Workflows"
          description="Deploy, run, and monitor — all from your terminal."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to start building?"
          description="Install the CLI and deploy your first function in minutes."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'CLI Reference', href: '/docs/reference/cli' }}
        />
      </main>
    </div>
  );
}
