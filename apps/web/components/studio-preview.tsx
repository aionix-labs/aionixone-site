'use client';

import { useState } from 'react';
import Image from 'next/image';

const tabs = [
  {
    id: 'design' as const,
    label: 'Design',
    image: '/studio/parallel_graph_editor.png',
    caption: 'Visual workflow editor with drag-and-drop steps'
  },
  {
    id: 'execute' as const,
    label: 'Execute',
    image: '/studio/parallel_graph_view.png',
    caption: 'Real-time execution visualization'
  },
  {
    id: 'inspect' as const,
    label: 'Inspect',
    image: '/studio/parallel_step_view.png',
    caption: 'Step-by-step execution details'
  },
  {
    id: 'trace' as const,
    label: 'Trace',
    image: '/studio/parallel_event_view.png',
    caption: 'Complete event history'
  }
];

export function StudioPreview() {
  const [activeTab, setActiveTab] = useState<'design' | 'execute' | 'inspect' | 'trace'>('design');
  const activeItem = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">Studio</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">See Governance in Action</h2>
      </div>

      {/* Tab buttons */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screenshot */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <Image
          src={activeItem.image}
          alt={`Studio ${activeTab} view`}
          width={1512}
          height={800}
          className="w-full"
          priority
        />
      </div>

      {/* Caption */}
      <p className="mt-4 text-center text-sm text-white/50">{activeItem.caption}</p>
    </section>
  );
}
