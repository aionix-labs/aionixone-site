import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta
} from '@/components/feature-page';
import { features, codeExamples, workflowNodes } from '@/content/features';

export default function WorkflowEnginePage() {
  const feature = features['workflow-engine'];
  const code = codeExamples['workflow-engine'];

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
          secondaryCta={{ label: 'View Examples', href: '/docs/examples' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* 8 Node Types */}
        <FeatureDetail
          label="Flexible Building Blocks"
          headline="8 Node Types for Any Flow"
          description="From simple sequential tasks to complex parallel processing with conditional branching. Build any automation pattern with composable nodes."
          bullets={[
            'Task — Execute functions, APIs, or shell commands',
            'Parallel — Run multiple branches concurrently',
            'Map — Iterate over arrays with batch processing',
            'Router — Conditional branching with JSONata expressions'
          ]}
          visual={
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {workflowNodes.map((node) => (
                <div
                  key={node.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                >
                  <div className="mb-1 font-medium text-cyan-400">{node.name}</div>
                  <div className="text-xs text-white/50">{node.description}</div>
                </div>
              ))}
            </div>
          }
        />

        {/* Error Handling */}
        <FeatureDetail
          label="Built-in Resilience"
          headline="Never Lose a Workflow Execution"
          description="Automatic retry with exponential backoff, catch blocks for graceful error handling, and configurable timeouts. Your workflows recover from failures without manual intervention."
          bullets={[
            'Retry policies with backoff rate and max delay',
            'Catch blocks route errors to recovery steps',
            'Per-step and workflow-level timeouts',
            'Dead letter queue for failed executions'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`"retry": [{
  "errorEquals": ["NetworkError"],
  "maxAttempts": 3,
  "intervalSeconds": 2,
  "backoffRate": 2.0
}],
"catch": [{
  "errorEquals": ["*"],
  "next": "HandleError"
}]`}
              </pre>
            </div>
          }
          reverse
        />

        {/* Visual Editor */}
        <FeatureDetail
          label="Visual or Code"
          headline="Design Workflows Your Way"
          description="Use Studio for drag-and-drop visual design with real-time DSL sync, or write JSON directly with full IDE support. Changes in one are instantly reflected in the other."
          bullets={[
            'Drag-and-drop workflow canvas',
            'Real-time bidirectional DSL sync',
            'Execution monitoring and debugging',
            'VS Code extension with IntelliSense'
          ]}
          visual={
            <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">
              <div className="flex h-full items-center justify-center text-white/40">
                [Studio Screenshot]
              </div>
            </div>
          }
        />

        {/* Code Example */}
        <CodeExample
          title="Simple and Powerful DSL"
          description="Define complex workflows in readable JSON with JSONata expressions for data mapping."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to orchestrate your first workflow?"
          description="Get started in minutes with our quick start guide."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/stepflow' }}
        />
      </main>
    </div>
  );
}
