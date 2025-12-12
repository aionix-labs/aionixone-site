export const services = [
  {
    name: 'StepFlow',
    category: 'Workflow Orchestration',
    description:
      'Event-driven workflows with JSONata mapping, parallelism, retries, and Prometheus metrics.',
    trn: 'trn:stepflow:{tenant}:template/{name}'
  },
  {
    name: 'AionixFn',
    category: 'Serverless Runtime',
    description:
      'Multi-runtime functions (Python, Deno) with versioning, alias routing, and observability.',
    trn: 'trn:aionixfn:{tenant}:function/{name}'
  },
  {
    name: 'Igniter',
    category: 'Event Triggers',
    description:
      'Schedules, webhooks, and event-based triggers that route into workflows or functions.',
    trn: 'trn:igniter:{tenant}:trigger/{name}'
  },
  {
    name: 'OpenAct',
    category: 'Connectors',
    description:
      'Unified API execution with AuthFlow OAuth2 and 10+ production connectors.',
    trn: 'trn:openact:{tenant}:action/{kind}/{name}'
  },
  {
    name: 'CredVault',
    category: 'Secrets',
    description:
      'Encrypted credential store with rotation, audit logs, and DSL access via $secret().',
    trn: 'trn:credvault:{tenant}:credential/{name}'
  },
  {
    name: 'ParamStore',
    category: 'Configuration',
    description:
      'Hierarchical parameters with version history and $param() references.',
    trn: 'trn:paramstore:{tenant}:param/{path}'
  }
];
