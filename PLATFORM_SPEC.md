# AionixOne Platform Specification

**Version:** 1.0
**Status:** Official
**Last Update:** 2025-12-10

---

## 1. What is AionixOne?

**AionixOne** is a **Portable Cloud Runtime** — a complete cloud automation platform compiled into a single Rust binary.

> **Full cloud capabilities. One binary. Zero dependencies.**

It delivers the core capabilities of a modern cloud platform (workflows, functions, triggers, connectors, secrets, configuration) in a local-first, single-process deployment model.

---

## 2. Positioning

### The Problem

| Traditional Cloud | Pain Points |
|-------------------|-------------|
| AWS Step Functions + Lambda + EventBridge + Secrets Manager + Parameter Store | 5+ services to configure |
| Requires cloud account, network, billing | Setup friction |
| Vendor lock-in | Migration cost |
| Distributed complexity | Operational overhead |

### The Solution

**AionixOne** packages equivalent capabilities into:

- **One executable** (~50MB Rust binary)
- **Zero external dependencies** (SQLite embedded)
- **Instant startup** (`./aionix` and you're running)
- **Full offline support** (no network required)

### Target Users

1. **Developers** who want to run workflows/functions locally without cloud accounts
2. **Edge/IoT deployments** that cannot rely on public cloud
3. **Privacy-sensitive environments** where data cannot leave the machine
4. **Self-hosted enthusiasts** seeking alternatives to Zapier/n8n/Temporal
5. **Startups/small teams** who want cloud capabilities without cloud costs

---

## 3. Core Services

AionixOne consists of **six integrated services**, all running in a single process:

| Service | Category | Cloud Equivalent | Description |
|---------|----------|------------------|-------------|
| **StepFlow** | Orchestration | AWS Step Functions | Event-driven workflow engine with JSONata mapping, parallel/map execution, retry/catch semantics |
| **AionixFn** | Compute | AWS Lambda | Multi-runtime serverless functions (Python, Deno) with version/alias management and traffic routing |
| **Igniter** | Events | AWS EventBridge | Trigger management service supporting schedule, webhook, and event-based triggers |
| **OpenAct** | Integration | API Gateway + Integrations | Unified API execution platform with 10+ connectors and AuthFlow OAuth2 |
| **CredVault** | Security | AWS Secrets Manager | Secure credential storage with versioning, rotation, and audit logging |
| **ParamStore** | Configuration | AWS Parameter Store | Hierarchical configuration management with dynamic evaluation |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AionixOne Binary                             │
│                   "Portable Cloud Runtime"                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Developer Interfaces                                              │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐                  │
│   │  aio CLI  │    │  Studio   │    │  VS Code  │                  │
│   │ (Terminal)│    │  (Web UI) │    │(Extension)│                  │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘                  │
│         └────────────────┴────────────────┘                        │
│                          │                                          │
│                          ▼                                          │
│                ┌─────────────────────┐                             │
│                │   Unified HTTP API  │                             │
│                │   (aionix-server)   │                             │
│                └──────────┬──────────┘                             │
│                           │                                         │
│   ┌───────────────────────┼───────────────────────┐                │
│   │           │           │           │           │                │
│   ▼           ▼           ▼           ▼           ▼           ▼    │
│ ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐        │
│ │Step │   │Aionix│   │Open │   │Igni │   │Cred │   │Param│        │
│ │Flow │   │Fn    │   │Act  │   │ter  │   │Vault│   │Store│        │
│ └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘        │
│    └─────────┴─────────┴─────────┴─────────┴─────────┘             │
│                          │                                          │
│              ┌───────────┴───────────┐                             │
│              │   TRN + Executor Bus  │                             │
│              │   (Unified Routing)   │                             │
│              └───────────────────────┘                             │
│                          │                                          │
│              ┌───────────┴───────────┐                             │
│              │   SQLite (Embedded)   │                             │
│              │   Single-file Storage │                             │
│              └───────────────────────┘                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Service Deep Dive

### 4.1 StepFlow — Workflow Engine

**TRN Pattern:** `trn:stepflow:{tenant}:template/{name}`

A high-performance, event-driven workflow engine with:

- **State Types:** Task, Parallel, Map, Router (Choice), Wait, Set, Succeed, Fail
- **Data Transformation:** Unified JSONata mapping with `{% expression %}` syntax
- **Error Handling:** Retry policies, catch blocks, timeout management
- **Execution Modes:** Sync, async, callback (extensible)
- **Observability:** Prometheus metrics, execution history, real-time status

**Example Workflow DSL:**

```json
{
  "entry": "ProcessOrder",
  "states": {
    "ProcessOrder": {
      "type": "task",
      "action": "http",
      "parameters": {
        "url": "{% 'https://api.example.com/orders/' & input.orderId %}"
      },
      "output": {
        "expression": { "orderId": "{% result.id %}" }
      },
      "next": "NotifyCustomer"
    },
    "NotifyCustomer": {
      "type": "task",
      "action": "email",
      "parameters": {
        "to": "{% input.customerEmail %}",
        "subject": "Order Confirmed"
      },
      "end": true
    }
  }
}
```

### 4.2 AionixFn — Serverless Functions

**TRN Pattern:** `trn:aionixfn:{tenant}:function/{name}`

Multi-runtime serverless function platform:

- **Runtimes:** Python 3.11+, Deno (TypeScript/JavaScript)
- **Version Management:** Immutable versions, aliases, rollback support
- **Traffic Routing:** A/B testing, canary deployments via traffic weights
- **Resource Isolation:** CPU/memory limits via rlimit
- **Observability:** Execution logs, function metrics, audit trail

**API Surface:**

| Endpoint | Description |
|----------|-------------|
| `POST /api/v1/functions` | Create function |
| `POST /api/v1/functions/{name}/versions` | Register version |
| `POST /api/v1/functions/{name}/invoke` | Invoke function |
| `POST /api/v1/functions/{name}/aliases/{alias}/traffic` | Configure traffic |

### 4.3 OpenAct — Connector Platform

**TRN Pattern:** `trn:openact:{tenant}:action/{kind}/{name}`

Unified API execution with:

- **Connectors:** HTTP, PostgreSQL, MySQL, Redis, Kafka, S3, MongoDB, Elasticsearch, SMTP, and more
- **AuthFlow Engine:** Workflow-based OAuth2 with PKCE, automatic token refresh
- **Entry Points:** CLI, REST API, MCP (Model Context Protocol)
- **Build Optimization:** Selective connector compilation via `connectors.toml`

**Supported Connectors:**

| Category | Connectors |
|----------|------------|
| HTTP | REST APIs, GraphQL, Webhooks |
| Databases | PostgreSQL, MySQL, SQLite, MongoDB |
| Message Queues | Kafka, Redis Pub/Sub, RabbitMQ |
| Storage | S3, MinIO, Local filesystem |
| Communication | SMTP, Slack, Discord |

### 4.4 Igniter — Trigger Service

**TRN Pattern:** `trn:igniter:{tenant}:trigger/{name}`

Event-driven trigger management:

- **Trigger Types:** Schedule (cron), Webhook, Event-based
- **Integration:** Routes to StepFlow workflows or AionixFn functions
- **Architecture:** Clean separation (storage, core, executor adapter, HTTP layer)

### 4.5 CredVault — Secrets Management

**TRN Pattern:** `trn:credvault:{tenant}:credential/{name}`

Secure credential storage:

- **Credential Types:** API keys, passwords, certificates, OAuth tokens
- **Versioning:** Immutable versions with activation/retirement lifecycle
- **Rotation:** Programmatic rotation with audit logging
- **Access:** DSL reference via `$secret.{name}` syntax
- **Encryption:** AES-256 at rest with master key management

### 4.6 ParamStore — Configuration Management

**TRN Pattern:** `trn:paramstore:{tenant}:param/{path}`

Hierarchical parameter storage:

- **Structure:** Path-based hierarchy (e.g., `/app/db/host`)
- **Types:** String, number, boolean, JSON, secret reference
- **Dynamic Evaluation:** Expression evaluation at read time
- **Versioning:** Full version history with rollback
- **Access:** DSL reference via `$param.{path}` syntax

---

## 5. Unified Resource Naming (TRN)

All resources in AionixOne are identified by **Tenant Resource Names (TRN)**:

```
trn:{service}:{tenant}:{resource_type}/{resource_path}
```

**Examples:**

| Resource | TRN |
|----------|-----|
| Workflow template | `trn:stepflow:prod:template/order-flow` |
| Function | `trn:aionixfn:prod:function/process-payment` |
| HTTP connection | `trn:openact:prod:connection/http/github-api` |
| Trigger | `trn:igniter:prod:trigger/daily-report` |
| Secret | `trn:credvault:prod:credential/db-password` |
| Parameter | `trn:paramstore:prod:param/app/config/timeout` |

**Benefits:**

- Consistent resource identification across all services
- Multi-tenant isolation built-in
- CLI/API/DSL all use the same naming scheme
- Enables cross-service references (e.g., workflow referencing a secret)

---

## 6. Developer Experience

### 6.1 aio CLI

Unified command-line interface covering all services:

```bash
# Functions
aio fn list
aio fn invoke my-func --data '{"x": 1}'
aio fn logs my-func --follow

# Workflows
aio wf create order-flow --dsl flow.json
aio wf run order-flow --data '{"orderId": "123"}'
aio wf exec list --status running

# Actions (Connectors)
aio act execute http.get-users --data '{}'
aio act conn test my-postgres

# Triggers
aio tr create daily-sync --trigger-type schedule --config '{"cron": "0 0 * * *"}'
aio tr enable daily-sync

# Secrets
aio sec create db-password --value "secret123"
aio sec reveal db-password

# Parameters
aio param set /app/config/timeout --value 30
aio param get /app/config/timeout
```

**Features:**

- TRN-first resolution (accepts full TRN or short names)
- Multiple output formats: `--output table|json|yaml|wide`
- Shell completion: `aio completion bash|zsh|fish`
- Documentation export: `aio docs --format markdown`

### 6.2 Studio — Visual Workflow Editor

**Designed to mirror the AWS Step Functions Studio experience, but runs entirely offline.**

AionixOne Studio is a professional-grade visual workflow editor built with React, TypeScript, and React Flow. It provides the same intuitive drag-and-drop experience as AWS Step Functions Workflow Studio — without requiring an AWS account or network connection.

#### Architecture

| Component | Files | Description |
|-----------|-------|-------------|
| **Core Controller** | 1,200+ lines | Graph state management, DSL sync, history |
| **Transaction Engine** | 11 transaction types | Atomic operations with undo/redo support |
| **Inspector Panels** | 8 specialized panels | Per-state-type property editors |
| **Interaction Layer** | 6 modules | Drag-and-drop, hit-testing, selection |
| **Test Coverage** | 100+ tests | Comprehensive unit and integration tests |
| **Total Codebase** | 480+ TypeScript files | Production-grade frontend architecture |

#### Transaction System

Professional graph editors require atomic, reversible operations. Studio implements a full transaction engine:

```
transactions/
├── branch/     → Create/modify parallel branches
├── catch/      → Add/edit error handlers
├── delete/     → Remove nodes with graph repair
├── move/       → Reposition nodes in workflow
├── node/       → Add/update node properties
├── replace/    → Swap node types
├── router/     → Manage choice/router conditions
└── update/     → Batch property updates
```

Every operation is:
- **Atomic** — Completes fully or rolls back
- **Reversible** — Full undo/redo support
- **Validated** — Graph invariants checked after each change

#### State-Specific Inspectors

Unlike generic property panels, Studio provides **dedicated inspectors for each state type**:

| State Type | Inspector | Key Features |
|------------|-----------|--------------|
| **Task** | TaskInspector (35KB) | Action config, parameters, retry/catch, timeout |
| **Router** | RouterInspector (31KB) | Condition builder, route management, default path |
| **Map** | MapInspector (23KB) | Items path, iterator config, concurrency, tolerance |
| **Parallel** | ParallelInspector (14KB) | Branch editor, error aggregation, concurrency |
| **Wait** | WaitInspector (19KB) | Duration/timestamp picker, dynamic expressions |
| **Set** | SetInspector (11KB) | Variable assignment, JSONata editor |
| **Succeed** | SucceedInspector | Output mapping, result configuration |
| **Fail** | FailInspector | Error code, cause, custom messages |

#### Interaction Layer

Full-featured graph interaction system:

| Module | Purpose |
|--------|---------|
| `dnd.ts` | Drag-and-drop from palette to canvas |
| `hit-test.ts` | Precise node/edge/port detection |
| `selection.ts` | Multi-select, box selection |
| `move.ts` | Node repositioning with constraints |
| `ghost.ts` | Drag preview rendering |
| `constraints/` | Layout rules and validation |

#### Key Features

| Feature | Description |
|---------|-------------|
| **Drag-and-Drop** | Add states from palette, reorder in workflow |
| **Real-time DSL Sync** | Bidirectional — edit visually or in code |
| **Auto Layout** | Dagre-powered automatic graph arrangement |
| **Undo/Redo** | Full history with transaction-based operations |
| **Execution View** | Monitor running workflows, inspect state data |
| **Validation** | Real-time DSL validation with error highlighting |
| **Keyboard Shortcuts** | Professional editing experience |

#### Comparison with AWS Step Functions Studio

| Capability | AWS Step Functions Studio | AionixOne Studio |
|------------|---------------------------|------------------|
| Visual drag-and-drop | ✅ | ✅ |
| State-specific panels | ✅ | ✅ |
| DSL code view | ✅ | ✅ Real-time sync |
| Auto layout | ✅ | ✅ Dagre |
| Undo/Redo | ✅ | ✅ Transaction engine |
| Execution monitoring | ✅ | ✅ |
| **Requires AWS account** | ✅ Yes | ❌ No |
| **Requires network** | ✅ Yes | ❌ No |
| **Cost** | Pay per execution | Free |
| **Private deployment** | ❌ | ✅ |
| **Offline support** | ❌ | ✅ |

> **The Step Functions Studio experience you know — running entirely on your machine.**

### 6.3 VS Code Extension

IDE integration for StepFlow development:

- **Visual editor** embedded in VS Code
- **Syntax highlighting** for `.stepflow.json` files
- **Commands:** Open Studio, New Template, Open Template
- **Live connection** to Aionix API server

---

## 7. Technical Specifications

### 7.1 Runtime Requirements

| Requirement | Specification |
|-------------|---------------|
| Binary Size | ~50MB (release build) |
| Memory | 100MB - 500MB (depending on workload) |
| CPU | Single-core capable, scales with concurrency |
| Storage | SQLite file (typically 1MB - 100MB) |
| OS | Linux, macOS, Windows |
| Network | Optional (fully offline capable) |

### 7.2 Performance Benchmarks

| Metric | Value |
|--------|-------|
| Workflow cold start | ~14ms |
| Parallel execution (3 tasks) | ~68ms |
| JSONata transformation | 1-5ms |
| Function invocation | <100ms (Python), <50ms (Deno) |
| Cancellation response | ~100ms |

### 7.3 Observability

- **Prometheus metrics** at `GET /metrics`
- **Structured logging** via tracing
- **Execution history** queryable via API
- **Audit logs** for security events

---

## 8. Deployment

### 8.1 Quick Start

```bash
# Download binary
curl -L https://releases.aionixone.com/latest/aionix -o aionix
chmod +x aionix

# Start server
./aionix --port 53000

# Access
# API: http://localhost:53000/api
# Metrics: http://localhost:53000/metrics
```

### 8.2 Configuration

```toml
# config.toml
[server]
port = 53000
host = "0.0.0.0"

[database]
data_path = "./data"

[logging]
level = "info"
```

### 8.3 Docker

```dockerfile
FROM debian:bookworm-slim
COPY aionix /usr/local/bin/
EXPOSE 53000
CMD ["aionix", "--port", "53000"]
```

---

## 9. Comparison Matrix

### 9.1 Platform Capabilities

| Capability | AWS | Temporal | n8n | Airflow | **AionixOne** |
|------------|-----|----------|-----|---------|---------------|
| Workflows | Step Functions | ✅ | ✅ | ✅ | ✅ StepFlow |
| Functions | Lambda | ❌ | ❌ | ❌ | ✅ AionixFn |
| Triggers | EventBridge | ❌ | ✅ | ✅ | ✅ Igniter |
| Connectors | API Gateway | ❌ | ✅ | ✅ | ✅ OpenAct |
| Secrets | Secrets Manager | ❌ | ❌ | ❌ | ✅ CredVault |
| Config | Parameter Store | ❌ | ❌ | ❌ | ✅ ParamStore |
| Single Binary | ❌ | ❌ | ❌ | ❌ | ✅ |
| Offline Support | ❌ | ❌ | ✅ | ✅ | ✅ |
| Vendor Lock-in | ✅ | ❌ | ❌ | ❌ | ❌ |

### 9.2 Visual Editor Comparison

| Feature | AWS Step Functions Studio | n8n | **AionixOne Studio** |
|---------|---------------------------|-----|----------------------|
| Drag-and-drop | ✅ | ✅ | ✅ |
| State-specific inspectors | ✅ | ⚠️ Generic | ✅ |
| DSL bidirectional sync | ✅ | ❌ | ✅ |
| Undo/Redo | ✅ | ✅ | ✅ |
| Offline support | ❌ | ✅ | ✅ |
| Requires cloud account | ✅ | ❌ | ❌ |

### 9.3 Developer Tooling

| Tool | AWS | Temporal | n8n | Airflow | **AionixOne** |
|------|-----|----------|-----|---------|---------------|
| CLI | ✅ aws cli | ✅ tctl | ⚠️ Basic | ✅ airflow cli | ✅ aio (TRN-first, full coverage) |
| Web UI | ✅ Console | ✅ | ✅ | ✅ | ✅ Studio |
| VS Code Extension | ✅ AWS Toolkit | ❌ | ❌ | ❌ | ✅ |
| Unified Resource Naming | ✅ ARN | ❌ | ❌ | ❌ | ✅ TRN |

---

## 10. Use Cases

### Ideal For

| Scenario | Why AionixOne |
|----------|---------------|
| **Local Development** | Test workflows without cloud accounts |
| **Edge Computing** | Run automation on IoT/edge devices |
| **Air-gapped Environments** | Full functionality without network |
| **CI/CD Pipelines** | Embed automation in build processes |
| **Self-hosted Automation** | Replace SaaS tools with owned infrastructure |
| **Prototyping** | Rapidly build and test automation flows |

### Example Applications

- **E-commerce:** Order processing with payment, inventory, shipping
- **DevOps:** CI/CD pipelines with conditional deployments
- **Data Processing:** ETL workflows with parallel transformations
- **IoT:** Sensor data collection and edge processing
- **Finance:** Risk analysis with parallel model evaluation

---

## 11. Roadmap

| Phase | Focus |
|-------|-------|
| Current | Core platform stability, documentation |
| Next | Additional connectors, performance optimization |
| Future | Clustering support, enterprise features, SaaS offering |

---

## 12. Summary

**AionixOne** is a **Portable Cloud Runtime** that delivers:

| Attribute | Value |
|-----------|-------|
| **Deployment** | Single Rust binary |
| **Capabilities** | 6 integrated services (workflow, functions, triggers, connectors, secrets, config) |
| **Experience** | CLI + Web Studio + VS Code Extension |
| **Performance** | Rust-powered, sub-100ms operations |
| **Dependencies** | Zero (SQLite embedded) |
| **Network** | Optional (fully offline capable) |

> **Full cloud capabilities. One binary. Zero dependencies.**

---

**AionixOne** — Your Cloud, Portable.
