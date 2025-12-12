import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta
} from '@/components/feature-page';
import { features, codeExamples } from '@/content/features';

export default function SecretsConfigPage() {
  const feature = features['secrets-config'];
  const code = codeExamples['secrets-config'];

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
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/credvault' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* Two Services */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl">🔐</div>
              <h3 className="mb-2 text-xl font-semibold">CredVault</h3>
              <p className="mb-4 text-white/60">
                Secure storage for sensitive credentials — API keys, passwords, certificates, OAuth tokens.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  AES-256 encryption at rest
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Programmatic rotation
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Access via $secret()
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-3xl">⚙️</div>
              <h3 className="mb-2 text-xl font-semibold">ParamStore</h3>
              <p className="mb-4 text-white/60">
                Hierarchical configuration — feature flags, URLs, thresholds, and non-sensitive settings.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Path-based hierarchy
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  String, number, JSON types
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Access via $param()
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Versioning */}
        <FeatureDetail
          label="Track Every Change"
          headline="Full Version History"
          description="Every update creates a new version. View the complete history, compare versions, and roll back instantly. Never wonder what changed or when."
          bullets={[
            'Immutable versions with timestamps',
            'View any historical value',
            'One-command rollback',
            'Diff between versions'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`$ aio sec versions my-api-key

VERSION  STATUS    CREATED
3        active    2024-01-15 12:00
2        inactive  2024-01-10 10:00
1        inactive  2024-01-01 09:00

$ aio sec reveal my-api-key --version 2
sk-old-key-xxx`}
              </pre>
            </div>
          }
        />

        {/* Audit Trail */}
        <FeatureDetail
          label="Complete Visibility"
          headline="Every Access Logged"
          description="Know who accessed what and when. Full audit trail for compliance and debugging. Exportable logs for your security team."
          bullets={[
            'Read, write, reveal events logged',
            'Timestamp and actor tracking',
            'Filter by credential or time range',
            'JSON export for analysis'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`$ aio sec audit my-api-key

ACTION   ACTOR      TIMESTAMP
reveal   cli:admin  2024-01-15 12:00
rotate   cli:admin  2024-01-15 11:55
create   cli:admin  2024-01-01 09:00`}
              </pre>
            </div>
          }
          reverse
        />

        {/* DSL Integration */}
        <FeatureDetail
          label="Seamless Integration"
          headline="Reference Anywhere with $secret() and $param()"
          description="Use secrets and parameters directly in workflows, triggers, and connections. No environment variables, no config files — just reference by name."
          bullets={[
            '$secret(name) for credentials',
            '$param(path) for configuration',
            'Resolved at runtime, not build time',
            'Works in JSON, YAML, and code'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`# In workflow DSL
{
  "parameters": {
    "apiKey": "{% $secret.my-api-key %}",
    "timeout": "{% $param('/app/timeout') %}"
  }
}

# In connection config
config:
  password: "$secret(db-password)"
  poolSize: "$param(db-pool-size)"`}
              </pre>
            </div>
          }
        />

        {/* Code Example */}
        <CodeExample
          title="Simple CLI Operations"
          description="Create, rotate, and reference secrets and parameters with intuitive commands."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to secure your configuration?"
          description="Set up CredVault and ParamStore in minutes."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/credvault' }}
        />
      </main>
    </div>
  );
}
