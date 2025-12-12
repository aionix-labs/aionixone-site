import { Header } from '@/components/header';
import {
  FeatureHero,
  BenefitsGrid,
  FeatureDetail,
  CodeExample,
  FeatureCta
} from '@/components/feature-page';
import { features, codeExamples } from '@/content/features';

export default function ServerlessFunctionsPage() {
  const feature = features['serverless-functions'];
  const code = codeExamples['serverless-functions'];

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
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/aionixfn' }}
        />

        {/* Key Benefits */}
        <BenefitsGrid
          benefits={feature.benefits.map((b) => ({
            icon: <span>{b.icon}</span>,
            title: b.title,
            description: b.description
          }))}
        />

        {/* Multi-Runtime */}
        <FeatureDetail
          label="Write in Your Language"
          headline="Multi-Runtime Support"
          description="Deploy functions in Python or Deno (TypeScript/JavaScript). Each runtime is fully isolated with its own dependency management and resource limits."
          bullets={[
            'Python 3.x with pip/venv caching',
            'Deno with built-in TypeScript support',
            'Isolated execution environments',
            'Configurable memory and timeout limits'
          ]}
          visual={
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🐍</span>
                  <span className="font-medium">Python</span>
                </div>
                <code className="text-sm text-white/60">aio fn deploy my-func -r python3.11</code>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🦕</span>
                  <span className="font-medium">Deno</span>
                </div>
                <code className="text-sm text-white/60">aio fn deploy my-func -r deno</code>
              </div>
            </div>
          }
        />

        {/* Version Management */}
        <FeatureDetail
          label="Deploy with Confidence"
          headline="Immutable Versions, Instant Rollback"
          description="Every deployment creates a new immutable version. Roll back to any previous version instantly. No more 'it worked before' mysteries."
          bullets={[
            'Automatic version numbering',
            'Full deployment history',
            'One-command rollback',
            'Compare versions side by side'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`$ aio fn versions my-func

VERSION              STATUS    DEPLOYED
v20240115120000     active    2024-01-15 12:00
v20240114100000     inactive  2024-01-14 10:00
v20240113090000     inactive  2024-01-13 09:00

$ aio fn rollback my-func v20240114100000
✓ Rolled back to v20240114100000`}
              </pre>
            </div>
          }
          reverse
        />

        {/* Traffic Routing */}
        <FeatureDetail
          label="Safe Deployments"
          headline="Traffic Routing with Aliases"
          description="Route traffic between versions using named aliases. Implement canary deployments, A/B testing, or gradual rollouts without any external tools."
          bullets={[
            'Named aliases (prod, staging, canary)',
            'Percentage-based traffic splitting',
            'Automatic latest alias on deploy',
            'Zero-downtime deployments'
          ]}
          visual={
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm">
              <pre className="text-white/70">
                {`# Create aliases
aio fn alias set my-func prod v20240115

# Split traffic 90/10
aio fn alias set my-func canary v20240116 --weight 10

# Invoke via alias
aio fn invoke my-func:prod --data '{}'
aio fn invoke my-func:canary --data '{}'`}
              </pre>
            </div>
          }
        />

        {/* Code Example */}
        <CodeExample
          title="Simple Handler Pattern"
          description="Write functions with a familiar handler pattern. Access secrets, parameters, and execution context directly."
          code={code.code}
          language={code.language}
        />

        {/* CTA */}
        <FeatureCta
          headline="Ready to deploy your first function?"
          description="From code to running in under a minute."
          primaryCta={{ label: 'Quick Start Guide', href: '/docs/getting-started' }}
          secondaryCta={{ label: 'API Reference', href: '/docs/reference/aionixfn' }}
        />
      </main>
    </div>
  );
}
