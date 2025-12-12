import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta,
  AvailabilityBadge
} from '@/components/feature-page';
import { features, codeExamples, triggerTypes } from '@/content/features';

export default function EventTriggersPage() {
  const feature = features['event-triggers'];
  const code = codeExamples['event-triggers'];

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
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/igniter' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* Trigger Types Grid */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
              10 Trigger Types
            </p>
            <h2 className="mt-2 text-2xl font-semibold">React to Any Event Source</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {triggerTypes.map((trigger) => (
              <div
                key={trigger.name}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{trigger.name}</span>
                  <AvailabilityBadge tier={trigger.availability} />
                </div>
                <p className="text-xs text-white/50">{trigger.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scheduling */}
        <FeatureDetail
          label="Time-Based Automation"
          headline="Cron Scheduling with Precision"
          description="Six-field cron expressions for second-level precision. Timezone support ensures your schedules run at the right time, everywhere."
          bullets={[
            '6-field cron: second, minute, hour, day, month, weekday',
            'Timezone-aware scheduling',
            'One-time delayed execution',
            'Human-readable schedule preview'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`# Every 5 minutes
schedule: "0 */5 * * * *"

# Weekdays at 9 AM Shanghai time
schedule: "0 0 9 * * 1-5"
timezone: "Asia/Shanghai"

# Every 2 hours at :30
schedule: "0 30 */2 * * *"`}
              </pre>
            </div>
          }
        />

        {/* Webhooks */}
        <FeatureDetail
          label="HTTP Integration"
          headline="Secure Webhook Endpoints"
          description="Receive callbacks from any service with built-in authentication. HMAC signature verification, basic auth, or bearer tokens — all configured declaratively."
          bullets={[
            'HMAC-SHA256 signature verification',
            'Basic and Bearer authentication',
            'Custom path routing',
            'Request/response logging'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`spec:
  source:
    path: "/hooks/github"
    methods: ["POST"]
    auth:
      type: hmac_sha256
      secret: "$secret(webhook-secret)"
  action:
    target: "trn:stepflow:..."`}
              </pre>
            </div>
          }
          reverse
        />

        {/* DLQ */}
        <FeatureDetail
          label="Never Lose Events"
          headline="Built-in Dead Letter Queue"
          description="Failed trigger executions are automatically captured. Inspect, retry, or purge at any time. No event is ever silently dropped."
          bullets={[
            'Automatic capture of failed events',
            'Inspect payload and error details',
            'One-click retry or bulk retry',
            'Configurable retention policy'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`$ aio tr dlq list my-trigger

ID          ERROR           TIMESTAMP
dlq-001     NetworkError    2024-01-15 12:00
dlq-002     TimeoutError    2024-01-15 11:55

$ aio tr dlq retry my-trigger dlq-001
✓ Retried dlq-001`}
              </pre>
            </div>
          }
        />

        {/* Code Example */}
        <CodeExample
          title="Declarative Trigger Configuration"
          description="Define triggers as YAML with full secret integration and target routing."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to automate your events?"
          description="Set up your first trigger in minutes."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/igniter' }}
        />
      </main>
    </div>
  );
}
