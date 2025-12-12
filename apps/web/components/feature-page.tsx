import * as React from 'react';
import { Button } from '@aionixone/ui';
import clsx from 'clsx';

// Feature Page Hero Section
type FeatureHeroProps = {
  icon?: React.ReactNode;
  label: string;
  headline: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function FeatureHero({
  icon,
  label,
  headline,
  description,
  primaryCta,
  secondaryCta
}: FeatureHeroProps) {
  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-20 text-center">
      {icon && <div className="flex justify-center text-5xl">{icon}</div>}
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">{label}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {headline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70">{description}</p>
      </div>
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {primaryCta && (
            <Button asChild variant="primary">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
          )}
          {secondaryCta && (
            <Button asChild variant="ghost">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

// Key Benefits Grid (3-4 cards)
type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type BenefitsGridProps = {
  benefits: Benefit[];
};

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className={clsx(
        'grid gap-6',
        benefits.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
      )}>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
          >
            <div className="mb-3 text-3xl">{benefit.icon}</div>
            <h3 className="mb-2 font-medium">{benefit.title}</h3>
            <p className="text-sm text-white/60">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Feature Detail Section (alternating left/right layout)
type FeatureDetailProps = {
  label?: string;
  headline: string;
  description: string;
  bullets?: string[];
  visual: React.ReactNode;
  reverse?: boolean;
};

export function FeatureDetail({
  label,
  headline,
  description,
  bullets,
  visual,
  reverse = false
}: FeatureDetailProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div
        className={clsx(
          'flex flex-col items-center gap-12 lg:flex-row',
          reverse && 'lg:flex-row-reverse'
        )}
      >
        <div className="flex-1 space-y-4">
          {label && (
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">{label}</p>
          )}
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{headline}</h2>
          <p className="text-white/70">{description}</p>
          {bullets && bullets.length > 0 && (
            <ul className="space-y-2 text-white/70">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1">{visual}</div>
      </div>
    </section>
  );
}

// Code Example Section
type CodeExampleProps = {
  title?: string;
  description?: string;
  code: string;
  language?: string;
};

export function CodeExample({ title, description, code, language = 'json' }: CodeExampleProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h2 className="mb-2 text-2xl font-semibold">{title}</h2>}
          {description && <p className="text-white/70">{description}</p>}
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <div className="h-3 w-3 rounded-full bg-white/20" />
          <div className="h-3 w-3 rounded-full bg-white/20" />
          <div className="h-3 w-3 rounded-full bg-white/20" />
          <span className="ml-2 text-xs text-white/40">{language}</span>
        </div>
        <pre className="overflow-x-auto p-4 text-sm">
          <code className="text-white/80">{code}</code>
        </pre>
      </div>
    </section>
  );
}

// Comparison Table
type ComparisonRow = {
  feature: string;
  us: string | boolean;
  others?: (string | boolean)[];
};

type ComparisonTableProps = {
  title?: string;
  headers: string[];
  rows: ComparisonRow[];
};

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-cyan-400">✓</span>
      ) : (
        <span className="text-white/30">—</span>
      );
    }
    return value;
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {title && <h2 className="mb-6 text-center text-2xl font-semibold">{title}</h2>}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={clsx(
                    'px-4 py-3 font-medium',
                    index === 0 ? 'text-left' : 'text-center'
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-white/80">{row.feature}</td>
                <td className="px-4 py-3 text-center">{renderCell(row.us)}</td>
                {row.others?.map((value, i) => (
                  <td key={i} className="px-4 py-3 text-center text-white/50">
                    {renderCell(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// CTA Section at bottom of feature page
type FeatureCtaProps = {
  headline: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function FeatureCta({ headline, description, primaryCta, secondaryCta }: FeatureCtaProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-12">
        <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">{headline}</h2>
        {description && <p className="mb-8 text-white/70">{description}</p>}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary">
            <a href={primaryCta.href}>{primaryCta.label}</a>
          </Button>
          {secondaryCta && (
            <Button asChild variant="ghost">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

// Availability Badge for Community/Pro features
type AvailabilityBadgeProps = {
  tier: 'community' | 'pro' | 'enterprise';
};

export function AvailabilityBadge({ tier }: AvailabilityBadgeProps) {
  const styles = {
    community: 'bg-green-500/20 text-green-400 border-green-500/30',
    pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    enterprise: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  };

  const labels = {
    community: 'Community',
    pro: 'Pro',
    enterprise: 'Enterprise'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        styles[tier]
      )}
    >
      {labels[tier]}
    </span>
  );
}
