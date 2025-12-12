'use client';

import { useState } from 'react';
import Image from 'next/image';

const tabs = [
  { id: 'editor' as const, label: 'Graph Editor', image: '/studio/parallel_graph_editor.png' },
  { id: 'execution' as const, label: 'Execution View', image: '/studio/parallel_graph_view.png' },
  { id: 'steps' as const, label: 'Step Table', image: '/studio/parallel_step_view.png' },
  { id: 'events' as const, label: 'Event Log', image: '/studio/parallel_event_view.png' }
];

export function ProofSection() {
  const [activeTab, setActiveTab] = useState<'editor' | 'execution' | 'steps' | 'events'>('editor');
  const activeImage = tabs.find((t) => t.id === activeTab)?.image || tabs[0].image;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
          See Everything. Trace Everything.
        </p>
      </div>

      {/* Subtitle */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-white/70">
          In one interface, you can see: who the object is (TRN), what it's doing (Operation), and
          what happened (Execution History).
        </p>
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
          src={activeImage}
          alt={`Studio ${activeTab} view`}
          width={1512}
          height={800}
          className="w-full"
          priority
        />
      </div>
    </section>
  );
}
