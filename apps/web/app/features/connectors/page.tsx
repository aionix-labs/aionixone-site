import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta,
  AvailabilityBadge
} from '@/components/feature-page';
import { features, codeExamples, connectorTypes } from '@/content/features';

export default function ConnectorsPage() {
  const feature = features['connectors'];
  const code = codeExamples['connectors'];

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
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/openact' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* Connector Types Grid */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
              11 Built-in Connectors
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Connect to Any Service</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {connectorTypes.map((connector) => (
              <div
                key={connector.name}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{connector.name}</span>
                  <AvailabilityBadge tier={connector.availability} />
                </div>
                <p className="text-xs text-white/50">{connector.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Unified Interface */}
        <FeatureDetail
          label="One API for Everything"
          headline="Unified Connector Interface"
          description="Every connector follows the same pattern: define a connection, specify an operation, provide input. No need to learn different APIs for different services."
          bullets={[
            'Consistent connection/operation/input pattern',
            'Automatic connection pooling',
            'Built-in retry and timeout handling',
            'Unified error responses'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`# Same pattern for all connectors
action:
  connector: "trn:openact:default:connection/..."
  operation: "query"  # or get, set, send, etc.
  input:
    # Operation-specific params`}
              </pre>
            </div>
          }
        />

        {/* Authentication */}
        <FeatureDetail
          label="Security Built-in"
          headline="Every Auth Pattern Supported"
          description="OAuth2 with PKCE, SASL, TLS certificates, API keys, basic auth — all configured declaratively with automatic token refresh and secret integration."
          bullets={[
            'OAuth2 with automatic token refresh',
            'SASL for Kafka authentication',
            'mTLS for secure connections',
            'API keys via CredVault integration'
          ]}
          visual={
            <div className="space-y-3">
              {[
                { name: 'OAuth2', desc: 'Auto token refresh' },
                { name: 'SASL', desc: 'Kafka, AMQP' },
                { name: 'TLS/mTLS', desc: 'Certificate auth' },
                { name: 'API Key', desc: '$secret() integration' },
                { name: 'Basic', desc: 'Username/password' }
              ].map((auth) => (
                <div
                  key={auth.name}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2"
                >
                  <span className="font-medium">{auth.name}</span>
                  <span className="text-sm text-white/50">{auth.desc}</span>
                </div>
              ))}
            </div>
          }
          reverse
        />

        {/* MCP Support */}
        <FeatureDetail
          label="AI Integration"
          headline="Model Context Protocol (MCP)"
          description="Connect to MCP-compatible AI tools and services. Invoke AI capabilities directly from your workflows with the same connector interface."
          bullets={[
            'stdio and HTTP transport',
            'Tool, resource, and prompt access',
            'Integrate Claude, GPT, and more',
            'Same TRN addressing pattern'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`kind: connection
metadata:
  name: claude-tools
spec:
  connector: mcp
  config:
    transport: stdio
    command: "npx"
    args: ["-y", "@anthropic/mcp-server"]

# Invoke AI tool in workflow
action:
  connector: "trn:openact:default:connection/claude-tools"
  operation: tool
  input:
    name: "search"
    arguments: { "query": "{% input.query %}" }`}
              </pre>
            </div>
          }
        />

        {/* Code Example */}
        <CodeExample
          title="Define Once, Use Anywhere"
          description="Connections are defined once and referenced by TRN in workflows, triggers, and functions."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to connect your services?"
          description="Set up your first connection in minutes."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/openact' }}
        />
      </main>
    </div>
  );
}
