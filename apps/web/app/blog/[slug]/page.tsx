import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { notFound } from 'next/navigation';
import { docsUrl } from '@/lib/constants';

// Blog posts content - will be moved to MDX files later
const posts: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    category: string;
    content: string;
  }
> = {
  'distributed-governance': {
    title: 'Distributed Governance: Why Execution Needs a Constitution',
    description:
      'When we talk about distributed systems, most think of performance and scalability. But what truly goes out of control is often execution itself.',
    date: '2025-12-14',
    category: 'Philosophy',
    content: `
## Execution Is Already Distributed — We Just Pretend It Isn't

Real-world systems are no longer single-point execution:

- Cron jobs
- Serverless functions
- CI/CD pipelines
- Webhooks
- Agent automation
- Ad-hoc scripts
- Workflow engines

These executions happen:

- On different machines
- At different times
- Under different permission contexts
- By different authors

Execution is already naturally distributed.

But here's the problem — **governance is not**.

---

## Traditional Distributed Systems Solve "Fast Computing," Not "Correct Computing"

Kubernetes, Temporal, Airflow, n8n, Windmill...

They're excellent at solving:

- Task scheduling
- State recovery
- Concurrent execution
- Fault tolerance and retry

But they rarely answer a more fundamental question:

**Who, under what conditions, can execute what?**

| Traditional Distributed Computing | Distributed Governance |
|----------------------------------|------------------------|
| Focus: Performance, Scalability | Focus: Security, Compliance, Control |
| Unit: Computing Resources | Unit: Execution Boundaries |
| Control: Centralized Scheduling | Control: Local Adjudication |
| Failure: Retry / Crash | Failure: Deny / Reject |

Computing fast matters. But computing wrong just once costs more.

---

## Execution Without Governance Is a Bug Factory

Many systems assume a dangerous premise:

**"If code can run, it should run."**

So you see:

- One expression crashes the entire system
- One webhook triggers a flow it shouldn't
- One agent gets permissions it shouldn't have
- One header injection leads to privilege escalation

The problem isn't "whether there are bugs" — it's whether the system allows bugs to become execution power.

**If execution has no constitution, every bug can become a privilege escalation.**

---

## What Is an "Execution Constitution"?

In AionixOne, we call this set of rules the **Execution Constitution**.

It's not a metaphor — it's a set of immutable principles enforced by the system.

Core constraints include:

1. **Identity First** — No Principal, no execution.
2. **Single Decision Point** — Each top-level execution allows only one authorization decision.
3. **Policy-Driven** — Explicit Allow, Explicit Deny, otherwise Implicit Deny.
4. **Deny Takes Precedence** — Explicit Deny always overrides Allow.
5. **Immutable Rules** — Builtin policies cannot be deleted or modified.
6. **Fully Auditable** — Every execution can answer: Who executed? What was executed? Why was it allowed/denied?

This isn't a configuration option. It's system-level law.

---

## AionixOne's Distributed Governance Model

AionixOne is not "a bigger distributed system."

Its goal is different.

**Not distributed computing — distributed governance.**

- Execution is decentralized
- Governance is embedded
- Rules are unified

Every AionixOne node is:

**An autonomous node that can execute independently, but must follow the same constitution.**

---

## Three Core Abstractions

### 1. Principal (Execution Subject)

The system recognizes only three identity types:

- **user**: Human operators
- **agent**: Automated programs
- **system**: Internal system components

They cannot be mixed, impersonated, or escalated.

---

### 2. TRN (Unified Resource Identifier)

Every resource is precisely identified:

\`\`\`
trn:{service}:{workspace}:{resource-type}/{resource-id}
\`\`\`

Examples:

- \`trn:aionixfn:default:function/hello\`
- \`trn:stepflow:prod:workflow/order-process\`

No TRN, no execution target.

---

### 3. /api/execute (The Only Legal Execution Entry)

All "real execution" operations must go through:

\`\`\`
/api/execute
\`\`\`

This is the constitutional entry point.

- All policy decisions happen here
- All unauthorized access is denied here
- There are no "backdoor APIs"

---

## Why This Is Local-First

AionixOne doesn't depend on a centralized control plane.

- No cluster needed
- No Master needed
- No Controller needed

Each node:

- Executes locally
- Adjudicates locally
- Audits locally

This means:

**Governance capability is distributed to every execution point.**

This is what we call **Distributed Governance**.

---

## What It Enables — and What It Prevents

**What it enables:**

- Local execution + global rules
- Secure agent execution
- Auditable automation
- Governance that works offline

**What it explicitly prevents:**

- Header injection
- Privilege escalation
- Bypass paths around authorization
- Dangerous "just run it" execution

---

## Governance Is Not an Afterthought

Many systems treat security as:

- A later feature
- An enterprise add-on
- An optional module

AionixOne chose a harder path:

**Governance is a prerequisite for execution systems, not a patch.**

---

## Conclusion

We believe:

**Before execution systems pursue scale, they should first have law.**

AionixOne isn't trying to run faster. It's trying to run correctly, controllably, and auditably — wherever it runs.

This is what we call **Distributed Governance**.
    `
  },
  'introducing-aionixone': {
    title: 'Introducing AionixOne: The Control Plane for Local Execution',
    description:
      'Why we built a governance layer for scripts, functions, and automation — without the cloud.',
    date: '2025-12-12',
    category: 'Announcement',
    content: `
## The Problem

Every organization has them: scripts running on cron, Python utilities that "just work," shell scripts that nobody dares to touch. They're not in the cloud. They're not managed. They're just... there.

And when something breaks, you dig through logs, guess, ask around. When someone leaves, the system becomes a black box. When you need to change something, you pray.

These systems aren't poorly written — they were just never truly governed. And without governance, responsibility always falls back on people.

## The Solution: Governance, Not Just Automation

AionixOne isn't another automation tool. It's a governance layer — a control plane that brings order to the chaos of local execution.

The rule is simple: **Anything that can execute must be governed.**

This is enforced through TRN (Tenant Resource Name), a universal addressing scheme:

\`\`\`
trn:<service>:<tenant>:<type>/<name>
\`\`\`

Every function, credential, schedule, and workflow gets a TRN. No TRN means it doesn't exist in the system.

Every action follows the same pattern: TRN + Operation. Every execution generates a traceable record.

Think of TRN as the identity of anything that is allowed to exist and run.

## What This Means for You

- **Traceable**: Every execution has a source, context, and history
- **Governed**: Objects must be registered to exist
- **Transferable**: System state doesn't depend on human memory

## Try It Now

AionixOne ships as a single binary. No cloud required. No agents. No rewriting your existing code.

Download the Community Edition and bring governance to your local execution world.
    `
  }
};

// Helper function to render inline formatting (bold, code, etc.)
function renderInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    const boldIndex = boldMatch?.index ?? Infinity;
    const codeIndex = codeMatch?.index ?? Infinity;

    if (boldIndex === Infinity && codeIndex === Infinity) {
      parts.push(remaining);
      break;
    }

    if (boldIndex <= codeIndex && boldMatch) {
      if (boldIndex > 0) {
        parts.push(remaining.slice(0, boldIndex));
      }
      parts.push(
        <strong key={key++} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldIndex + boldMatch[0].length);
    } else if (codeMatch) {
      if (codeIndex > 0) {
        parts.push(remaining.slice(0, codeIndex));
      }
      parts.push(
        <code key={key++} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-cyan-400">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeIndex + codeMatch[0].length);
    }
  }

  return parts.length === 1 ? parts[0] : parts;
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main>
        <article className="mx-auto max-w-3xl px-6 py-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white/80"
          >
            ← Back to Blog
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{post.category}</span>
              <span>·</span>
              <time>{post.date}</time>
            </div>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg text-white/60">{post.description}</p>
          </header>

          {/* Content */}
          <div className="prose prose-invert mt-12 max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-white/70 prose-p:leading-relaxed prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-li:text-white/70">
            {/* Simple markdown-like rendering - will be replaced with MDX */}
            {post.content.split('\n\n').map((paragraph, i) => {
              // Horizontal rule
              if (paragraph.trim() === '---') {
                return <hr key={i} className="my-8 border-white/10" />;
              }
              // H2
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="mt-12 mb-4 text-2xl font-semibold">
                    {renderInlineFormatting(paragraph.replace('## ', ''))}
                  </h2>
                );
              }
              // H3
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={i} className="mt-8 mb-3 text-xl font-semibold">
                    {renderInlineFormatting(paragraph.replace('### ', ''))}
                  </h3>
                );
              }
              // Code block
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```\w*\n?/g, '').trim();
                return (
                  <pre
                    key={i}
                    className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4"
                  >
                    <code className="font-mono text-sm text-cyan-400">{code}</code>
                  </pre>
                );
              }
              // Table
              if (paragraph.includes('|') && paragraph.split('\n').length > 1) {
                const lines = paragraph.split('\n').filter((line) => line.trim());
                // Check if it's a valid table (has header separator)
                const hasSeparator = lines.some((line) => /^\|?[\s-|]+\|?$/.test(line));
                if (hasSeparator) {
                  const dataLines = lines.filter((line) => !/^\|?[\s-|]+\|?$/.test(line));
                  const headers = dataLines[0]
                    ?.split('|')
                    .map((cell) => cell.trim())
                    .filter(Boolean);
                  const rows = dataLines.slice(1).map((line) =>
                    line
                      .split('|')
                      .map((cell) => cell.trim())
                      .filter(Boolean)
                  );
                  return (
                    <div key={i} className="my-6 overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-white/20">
                            {headers?.map((header, j) => (
                              <th
                                key={j}
                                className="px-4 py-3 text-left font-semibold text-white"
                              >
                                {renderInlineFormatting(header)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, j) => (
                            <tr key={j} className="border-b border-white/10">
                              {row.map((cell, k) => (
                                <td key={k} className="px-4 py-3 text-white/70">
                                  {renderInlineFormatting(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }
              // Unordered list
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                return (
                  <ul key={i} className="my-4 list-disc space-y-2 pl-6">
                    {items.map((item, j) => (
                      <li key={j} className="text-white/70">
                        {renderInlineFormatting(item.replace('- ', ''))}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Numbered list
              if (/^\d+\.\s/.test(paragraph)) {
                const items = paragraph.split('\n').filter((line) => /^\d+\.\s/.test(line));
                return (
                  <ol key={i} className="my-4 list-decimal space-y-2 pl-6">
                    {items.map((item, j) => (
                      <li key={j} className="text-white/70">
                        {renderInlineFormatting(item.replace(/^\d+\.\s/, ''))}
                      </li>
                    ))}
                  </ol>
                );
              }
              // Regular paragraph
              if (paragraph.trim()) {
                return (
                  <p key={i} className="my-4 leading-relaxed text-white/70">
                    {renderInlineFormatting(paragraph)}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-8 text-center">
            <h3 className="text-xl font-semibold">Ready to try AionixOne?</h3>
            <p className="mt-2 text-white/60">Single binary. Runs locally. Up in five minutes.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/aionix-labs/aionixone-releases"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
              >
                Download Community Edition
              </a>
              <a
                href={docsUrl('/getting-started')}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40"
              >
                Read Quick Start Guide
              </a>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
