'use client';

import { useState } from 'react';
import Image from 'next/image';
import { features, triggerTypes, connectorTypes } from '@/content/features';
import { AvailabilityBadge } from './feature-page';

type FeatureKey = keyof typeof features;

const featureOrder: FeatureKey[] = [
  'workflow-engine',
  'serverless-functions',
  'event-triggers',
  'connectors',
  'secrets-config',
  'developer-tools'
];

// Studio screenshot tabs
function StudioScreenshots() {
  const [activeTab, setActiveTab] = useState<'editor' | 'execution' | 'steps' | 'events'>('editor');

  const tabs = [
    { id: 'editor' as const, label: 'Graph Editor', image: '/studio/parallel_graph_editor.png' },
    { id: 'execution' as const, label: 'Execution View', image: '/studio/parallel_graph_view.png' },
    { id: 'steps' as const, label: 'Step Table', image: '/studio/parallel_step_view.png' },
    { id: 'events' as const, label: 'Event Log', image: '/studio/parallel_event_view.png' },
  ];

  const activeImage = tabs.find(t => t.id === activeTab)?.image || tabs[0].image;

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Screenshot */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        <Image
          src={activeImage}
          alt={`Studio ${activeTab} view`}
          width={1512}
          height={800}
          className="w-full"
          priority
        />
      </div>
    </div>
  );
}

// Feature-specific visual content
function FeatureVisual({ featureKey }: { featureKey: FeatureKey }) {
  switch (featureKey) {
    case 'workflow-engine':
      return <StudioScreenshots />;

    case 'serverless-functions':
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
              <span className="text-sm text-white/60">Runtime Support</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🐍</span>
                  <span className="font-medium">Python</span>
                </div>
                <code className="text-xs text-white/50">pip install, venv caching</code>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">🦕</span>
                  <span className="font-medium">Deno</span>
                </div>
                <code className="text-xs text-white/50">TypeScript/JavaScript</code>
              </div>
            </div>
          </div>
          {/* Version management visual */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
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
        </div>
      );

    case 'event-triggers':
      return (
        <div className="space-y-4">
          {/* Trigger types grid */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {triggerTypes.map((trigger) => (
              <div
                key={trigger.name}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{trigger.name}</span>
                  <AvailabilityBadge tier={trigger.availability} />
                </div>
                <p className="text-xs text-white/50">{trigger.description}</p>
              </div>
            ))}
          </div>
          {/* Cron example */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
            <pre className="text-white/70">
{`# Every 5 minutes
schedule: "0 */5 * * * *"

# Weekdays at 9 AM Shanghai time
schedule: "0 0 9 * * 1-5"
timezone: "Asia/Shanghai"

# Webhook with HMAC auth
spec:
  source:
    path: "/hooks/github"
    auth:
      type: hmac_sha256
      secret: "$secret(webhook-secret)"`}
            </pre>
          </div>
        </div>
      );

    case 'connectors':
      return (
        <div className="space-y-4">
          {/* Connector types grid */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {connectorTypes.slice(0, 8).map((connector) => (
              <div
                key={connector.name}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{connector.name}</span>
                  <AvailabilityBadge tier={connector.availability} />
                </div>
                <p className="text-xs text-white/50">{connector.description}</p>
              </div>
            ))}
          </div>
          {/* Connection example */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
            <pre className="text-white/70">
{`# Define connection
kind: connection
metadata:
  name: main-db
spec:
  connector: postgres
  config:
    connectionString: "$secret(pg-connection)"

# Use in workflow
action:
  connector: "trn:openact:default:connection/main-db"
  operation: query
  input:
    sql: "SELECT * FROM users WHERE status = $1"
    params: ["active"]`}
            </pre>
          </div>
        </div>
      );

    case 'secrets-config':
      return (
        <div className="space-y-4">
          {/* Two services */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-2xl">🔐</div>
              <h4 className="mb-2 font-semibold">CredVault</h4>
              <p className="mb-3 text-sm text-white/60">
                Encrypted secrets with AES-256
              </p>
              <ul className="space-y-1 text-xs text-white/50">
                <li>• API keys, passwords, certificates</li>
                <li>• Programmatic rotation</li>
                <li>• Access via $secret()</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-2xl">⚙️</div>
              <h4 className="mb-2 font-semibold">ParamStore</h4>
              <p className="mb-3 text-sm text-white/60">
                Hierarchical configuration
              </p>
              <ul className="space-y-1 text-xs text-white/50">
                <li>• Path-based hierarchy</li>
                <li>• String, number, JSON types</li>
                <li>• Access via $param()</li>
              </ul>
            </div>
          </div>
          {/* Usage example */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
            <pre className="text-white/70">
{`# Create and use secrets
aio sec create db-password --value "secret-123"

# Reference in workflows
{
  "parameters": {
    "password": "{% $secret.db-password %}",
    "timeout": "{% $param('/app/config/timeout') %}"
  }
}`}
            </pre>
          </div>
        </div>
      );

    case 'developer-tools':
      return (
        <div className="space-y-4">
          {/* Three tools */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-2xl">💻</div>
              <h4 className="mb-1 font-semibold">CLI (aio)</h4>
              <p className="text-xs text-white/50">Full-featured command-line interface</p>
              <span className="mt-2 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                Stable
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-2xl">🎨</div>
              <h4 className="mb-1 font-semibold">Studio</h4>
              <p className="text-xs text-white/50">Visual workflow editor</p>
              <span className="mt-2 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                Beta
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-2xl">📝</div>
              <h4 className="mb-1 font-semibold">VS Code</h4>
              <p className="text-xs text-white/50">IDE extension</p>
              <span className="mt-2 inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                Beta
              </span>
            </div>
          </div>
          {/* CLI commands */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm">
            <pre className="text-white/70">
{`# Deploy and manage
aio fn deploy my-func -f handler.py
aio wf create order-flow --dsl workflow.json
aio wf run order-flow --data '{"orderId": "123"}'

# Monitor
aio fn logs my-func --follow
aio dashboard`}
            </pre>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function FeaturesTabs() {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>('workflow-engine');
  const feature = features[activeFeature];

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {featureOrder.map((key) => {
          const f = features[key];
          const isActive = activeFeature === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFeature(key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              <span>{f.icon}</span>
              <span className="hidden sm:inline">{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Feature Content */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        {/* Feature Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400/80">
            {feature.label}
          </p>
          <h2 className="mb-3 text-2xl font-semibold sm:text-3xl">{feature.headline}</h2>
          <p className="mx-auto max-w-2xl text-white/60">{feature.description}</p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {feature.benefits.map((benefit, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <div className="mb-2 text-2xl">{benefit.icon}</div>
              <h4 className="mb-1 text-sm font-medium">{benefit.title}</h4>
              <p className="text-xs text-white/50">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Feature-specific Visual */}
        <FeatureVisual featureKey={activeFeature} />

        {/* Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/docs/getting-started"
            className="inline-flex items-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
          >
            Get Started
          </a>
          <a
            href={`/docs/reference/${activeFeature === 'workflow-engine' ? 'stepflow' : activeFeature === 'serverless-functions' ? 'aionixfn' : activeFeature === 'event-triggers' ? 'igniter' : activeFeature === 'connectors' ? 'openact' : activeFeature === 'secrets-config' ? 'credvault' : 'cli'}`}
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
