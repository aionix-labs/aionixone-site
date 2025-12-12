'use client';

import { useState, useEffect } from 'react';

// Workflow node definitions for visual display
const workflowDemo = {
  nodes: [
    { id: 'start', type: 'start', label: 'Start', x: 50, y: 150 },
    { id: 'validate', type: 'task', label: 'Validate Order', x: 180, y: 150 },
    { id: 'check', type: 'router', label: 'Check Stock', x: 340, y: 150 },
    { id: 'reserve', type: 'task', label: 'Reserve Items', x: 500, y: 80 },
    { id: 'notify', type: 'task', label: 'Notify Customer', x: 500, y: 220 },
    { id: 'process', type: 'parallel', label: 'Process', x: 660, y: 150 },
    { id: 'end', type: 'end', label: 'End', x: 820, y: 150 }
  ],
  edges: [
    { from: 'start', to: 'validate' },
    { from: 'validate', to: 'check' },
    { from: 'check', to: 'reserve', label: 'yes' },
    { from: 'check', to: 'notify', label: 'no' },
    { from: 'reserve', to: 'process' },
    { from: 'notify', to: 'process' },
    { from: 'process', to: 'end' }
  ]
};

const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  start: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
  end: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
  task: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
  router: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  parallel: { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' }
};

const nodeIcons: Record<string, string> = {
  start: '▶',
  end: '■',
  task: '⚡',
  router: '◇',
  parallel: '⫼'
};

export function WorkflowVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [executionStep, setExecutionStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const executionOrder = ['start', 'validate', 'check', 'reserve', 'process', 'end'];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setExecutionStep((prev) => {
        if (prev >= executionOrder.length - 1) {
          setIsAnimating(false);
          return -1;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleRunDemo = () => {
    setExecutionStep(0);
    setIsAnimating(true);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/80">order-processing.workflow</span>
          <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Active</span>
        </div>
        <button
          onClick={handleRunDemo}
          disabled={isAnimating}
          className="rounded-lg bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400 transition hover:bg-cyan-500/30 disabled:opacity-50"
        >
          {isAnimating ? 'Running...' : '▶ Run Demo'}
        </button>
      </div>

      {/* Canvas */}
      <div className="relative h-72 w-full overflow-hidden rounded-lg bg-black/30">
        <svg className="absolute inset-0 h-full w-full">
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges */}
          {workflowDemo.edges.map((edge, index) => {
            const fromNode = workflowDemo.nodes.find((n) => n.id === edge.from);
            const toNode = workflowDemo.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isActive =
              executionStep >= 0 &&
              executionOrder.indexOf(edge.from) < executionStep &&
              executionOrder.indexOf(edge.to) <= executionStep;

            return (
              <g key={index}>
                <line
                  x1={fromNode.x + 50}
                  y1={fromNode.y}
                  x2={toNode.x - 10}
                  y2={toNode.y}
                  stroke={isActive ? 'rgb(6, 182, 212)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
                {edge.label && (
                  <text
                    x={(fromNode.x + 50 + toNode.x - 10) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 5}
                    fill="rgba(255,255,255,0.4)"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {workflowDemo.nodes.map((node) => {
          const colors = nodeColors[node.type];
          const isExecuting = executionOrder[executionStep] === node.id;
          const isCompleted =
            executionStep >= 0 && executionOrder.indexOf(node.id) < executionStep;

          return (
            <div
              key={node.id}
              className={`absolute flex cursor-pointer flex-col items-center transition-all duration-300 ${
                isExecuting ? 'scale-110' : ''
              }`}
              style={{ left: node.x - 40, top: node.y - 25 }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div
                className={`flex h-12 w-20 items-center justify-center rounded-lg border ${colors.bg} ${colors.border} ${
                  isExecuting
                    ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black'
                    : isCompleted
                      ? 'border-green-500/50 bg-green-500/20'
                      : ''
                }`}
              >
                <span className={`text-lg ${isCompleted ? 'text-green-400' : colors.text}`}>
                  {isCompleted ? '✓' : nodeIcons[node.type]}
                </span>
              </div>
              <span className="mt-1 text-xs text-white/60">{node.label}</span>
            </div>
          );
        })}

        {/* Tooltip */}
        {activeNode && (
          <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs">
            <span className="text-white/60">Node: </span>
            <span className="text-cyan-400">{activeNode}</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-cyan-500/30"></span>
          <span>Task</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-yellow-500/30"></span>
          <span>Router</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-purple-500/30"></span>
          <span>Parallel</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-green-500/30"></span>
          <span>Start/End</span>
        </div>
      </div>
    </div>
  );
}

// Mini workflow nodes for feature cards
export function MiniWorkflowDemo() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {['Start', 'Task', 'Router', 'Task', 'End'].map((node, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`flex h-8 w-14 items-center justify-center rounded text-xs ${
              node === 'Start'
                ? 'bg-green-500/20 text-green-400'
                : node === 'End'
                  ? 'bg-red-500/20 text-red-400'
                  : node === 'Router'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-cyan-500/20 text-cyan-400'
            }`}
          >
            {node}
          </div>
          {i < 4 && <span className="mx-1 text-white/30">→</span>}
        </div>
      ))}
    </div>
  );
}
