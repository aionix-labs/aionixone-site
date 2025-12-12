// Feature page content definitions

export type FeatureData = {
  slug: string;
  icon: string;
  label: string;
  headline: string;
  description: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  availability: 'community' | 'pro' | 'enterprise';
};

export const features: Record<string, FeatureData> = {
  'workflow-engine': {
    slug: 'workflow-engine',
    icon: '🔄',
    label: 'StepFlow',
    headline: 'Orchestrate Complex Processes with Built-in Resilience',
    description:
      'Define multi-step workflows as JSON, execute with automatic retry, parallel processing, and full observability. No external dependencies required.',
    benefits: [
      {
        icon: '⚡',
        title: 'Fast Execution',
        description: '~14ms cold start, ~68ms parallel tasks'
      },
      {
        icon: '🛡️',
        title: 'Built-in Resilience',
        description: 'Retry policies, catch blocks, timeouts'
      },
      {
        icon: '👁️',
        title: 'Full Observability',
        description: 'Prometheus metrics, execution traces'
      },
      {
        icon: '🎨',
        title: 'Visual Editor',
        description: 'Design workflows in Studio'
      }
    ],
    availability: 'community'
  },

  'serverless-functions': {
    slug: 'serverless-functions',
    icon: '⚡',
    label: 'AionixFn',
    headline: 'Run Code, Not Infrastructure',
    description:
      'Deploy serverless functions in Python or Deno. Version management, alias routing, and traffic splitting built-in. Zero configuration required.',
    benefits: [
      {
        icon: '🐍',
        title: 'Multi-Runtime',
        description: 'Python 3.x, Deno (TS/JS)'
      },
      {
        icon: '📦',
        title: 'Versioned',
        description: 'Immutable versions, instant rollback'
      },
      {
        icon: '🎯',
        title: 'Traffic Routing',
        description: 'Canary, A/B testing via aliases'
      },
      {
        icon: '📊',
        title: 'Observable',
        description: 'Logs, metrics, audit trail'
      }
    ],
    availability: 'community'
  },

  'event-triggers': {
    slug: 'event-triggers',
    icon: '🔥',
    label: 'Igniter',
    headline: 'React to Events from Any Source',
    description:
      'Cron schedules, webhooks, Kafka, Redis, PostgreSQL, and more. One unified configuration for all your event-driven automation.',
    benefits: [
      {
        icon: '⏰',
        title: 'Scheduling',
        description: 'Cron with 6-field precision'
      },
      {
        icon: '🌐',
        title: 'Webhooks',
        description: 'HMAC, Basic, Bearer auth'
      },
      {
        icon: '📨',
        title: 'Messaging',
        description: 'Kafka, Redis, SQS'
      },
      {
        icon: '🔄',
        title: 'DLQ Built-in',
        description: 'Failed events auto-captured'
      }
    ],
    availability: 'community'
  },

  connectors: {
    slug: 'connectors',
    icon: '🔌',
    label: 'OpenAct',
    headline: 'Connect to Everything with One Interface',
    description:
      'Databases, APIs, message queues, and AI services. Unified connector interface with built-in connection pooling and OAuth2 support.',
    benefits: [
      {
        icon: '🗄️',
        title: 'Databases',
        description: 'PostgreSQL, MySQL, MongoDB, Redis'
      },
      {
        icon: '🌐',
        title: 'HTTP/APIs',
        description: 'REST, GraphQL, Webhooks'
      },
      {
        icon: '🔐',
        title: 'Auth Built-in',
        description: 'OAuth2, SASL, TLS, API keys'
      },
      {
        icon: '🤖',
        title: 'MCP Support',
        description: 'AI tool integration'
      }
    ],
    availability: 'community'
  },

  'secrets-config': {
    slug: 'secrets-config',
    icon: '🔐',
    label: 'CredVault + ParamStore',
    headline: 'Secure Configuration, Zero Hassle',
    description:
      'Encrypted secrets with rotation and audit logs. Hierarchical parameters with version history. Reference anywhere with $secret() and $param().',
    benefits: [
      {
        icon: '🔒',
        title: 'Encrypted',
        description: 'AES-256 at rest'
      },
      {
        icon: '📜',
        title: 'Versioned',
        description: 'Full history, instant rollback'
      },
      {
        icon: '🔄',
        title: 'Rotation',
        description: 'Programmatic secret rotation'
      },
      {
        icon: '📋',
        title: 'Audit Trail',
        description: 'Every access logged'
      }
    ],
    availability: 'community'
  },

  'developer-tools': {
    slug: 'developer-tools',
    icon: '🛠️',
    label: 'Developer Experience',
    headline: 'Build Your Way',
    description:
      'Powerful CLI for automation, visual Studio for design, VS Code extension for IDE integration. Choose your workflow.',
    benefits: [
      {
        icon: '💻',
        title: 'CLI (aio)',
        description: 'Full automation, CI/CD ready'
      },
      {
        icon: '🎨',
        title: 'Studio',
        description: 'Visual workflow editor'
      },
      {
        icon: '📝',
        title: 'VS Code',
        description: 'IntelliSense, validation'
      },
      {
        icon: '📊',
        title: 'Dashboard',
        description: 'TUI for monitoring'
      }
    ],
    availability: 'community'
  }
};

// Code examples for each feature
export const codeExamples: Record<string, { code: string; language: string }> = {
  'workflow-engine': {
    language: 'json',
    code: `{
  "entry": "ValidateOrder",
  "steps": {
    "ValidateOrder": {
      "type": "task",
      "action": "trn:aionixfn:default:function/validate:invoke",
      "parameters": { "orderId": "{% input.orderId %}" },
      "retry": [{ "errorEquals": ["*"], "maxAttempts": 3 }],
      "next": "ProcessPayment"
    },
    "ProcessPayment": {
      "type": "task",
      "action": "trn:openact:default:action/http/payment:execute",
      "parameters": { "amount": "{% input.amount %}" },
      "end": true
    }
  }
}`
  },

  'serverless-functions': {
    language: 'python',
    code: `# handler.py
def main(event, context):
    name = event.get('name', 'World')

    # Access secrets and params at runtime
    api_key = context.resolve("$secret(api-key)")
    base_url = context.resolve("$param(api-url)")

    return {
        "message": f"Hello, {name}!",
        "processed_at": context.execution_id
    }`
  },

  'event-triggers': {
    language: 'yaml',
    code: `# Cron trigger
kind: trigger/cron
metadata:
  name: daily-report
spec:
  source:
    schedule: "0 0 9 * * *"  # Every day at 9 AM
    timezone: "Asia/Shanghai"
  action:
    target: "trn:stepflow:default:workflow/generate-report:start"

---
# Webhook trigger
kind: trigger/webhook
metadata:
  name: github-events
spec:
  source:
    path: "/hooks/github"
    auth:
      type: hmac_sha256
      secret: "$secret(github-webhook-secret)"
  action:
    target: "trn:aionixfn:default:function/handle-github:invoke"`
  },

  connectors: {
    language: 'yaml',
    code: `# PostgreSQL connection
kind: connection
metadata:
  name: main-db
spec:
  connector: postgres
  config:
    connectionString: "$secret(pg-connection)"
    poolSize: 10

---
# Use in workflow
action:
  connector: "trn:openact:default:connection/main-db"
  operation: query
  input:
    sql: "SELECT * FROM users WHERE status = $1"
    params: ["active"]`
  },

  'secrets-config': {
    language: 'bash',
    code: `# Create secret
aio sec create db-password --value "super-secret-123"

# Create parameter
aio param set /app/config/timeout --value 30

# Use in workflows with $secret() and $param()
{
  "parameters": {
    "password": "{% $secret.db-password %}",
    "timeout": "{% $param('/app/config/timeout') %}"
  }
}

# Rotate secret (creates new version)
aio sec rotate db-password --value "new-secret-456"`
  },

  'developer-tools': {
    language: 'bash',
    code: `# Deploy function
aio fn deploy my-func -f handler.py -e handler

# Create workflow
aio wf create order-flow --dsl workflow.json

# Run with data
aio wf run order-flow --data '{"orderId": "123"}'

# View logs
aio fn logs my-func --follow

# Interactive dashboard
aio dashboard`
  }
};

// Node types for workflow engine visual
export const workflowNodes = [
  { name: 'Task', description: 'Execute an action' },
  { name: 'Parallel', description: 'Run branches concurrently' },
  { name: 'Map', description: 'Iterate over array' },
  { name: 'Router', description: 'Conditional branching' },
  { name: 'Wait', description: 'Delay execution' },
  { name: 'Set', description: 'Assign variables' },
  { name: 'Succeed', description: 'Mark success' },
  { name: 'Fail', description: 'Mark failure' }
];

// Trigger types with availability
export const triggerTypes = [
  { name: 'Cron', description: 'Time-based scheduling', availability: 'community' as const },
  { name: 'Webhook', description: 'HTTP callbacks', availability: 'community' as const },
  { name: 'HTTP Poll', description: 'Poll endpoints', availability: 'community' as const },
  { name: 'Delay', description: 'One-time scheduled', availability: 'community' as const },
  { name: 'Kafka', description: 'Stream processing', availability: 'pro' as const },
  { name: 'Redis', description: 'Pub/Sub & Streams', availability: 'pro' as const },
  { name: 'PostgreSQL', description: 'LISTEN/NOTIFY', availability: 'pro' as const },
  { name: 'SQS', description: 'AWS queues', availability: 'pro' as const },
  { name: 'FileWatch', description: 'File system', availability: 'pro' as const },
  { name: 'IMAP', description: 'Email monitoring', availability: 'pro' as const }
];

// Connector types with availability
export const connectorTypes = [
  { name: 'HTTP', description: 'REST APIs', availability: 'community' as const },
  { name: 'PostgreSQL', description: 'SQL database', availability: 'community' as const },
  { name: 'MySQL', description: 'SQL database', availability: 'community' as const },
  { name: 'SQLite', description: 'Embedded DB', availability: 'community' as const },
  { name: 'Redis', description: 'Key-value store', availability: 'community' as const },
  { name: 'MongoDB', description: 'Document DB', availability: 'pro' as const },
  { name: 'Elasticsearch', description: 'Search engine', availability: 'pro' as const },
  { name: 'Kafka', description: 'Streaming', availability: 'pro' as const },
  { name: 'S3', description: 'Object storage', availability: 'pro' as const },
  { name: 'SMTP', description: 'Email sending', availability: 'community' as const },
  { name: 'MCP', description: 'AI tools', availability: 'community' as const }
];
