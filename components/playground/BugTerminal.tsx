"use client";

import { useRef, useState } from "react";

const bugs = [
  ["Error 404", "Motivation not found.", "monday.ts:1:1"],
  ["TypeError", "Coffee is not a function.", "morning.ts:7:12"],
  ["Warning", "Client requested one small change.", "scope.ts:∞:0"],
  ["Fatal Error", "Works on my machine.", "deploy.sh:42:0"],
  ["RangeError", "Maximum call stack size exceeded in meeting.", "standup.ts:15:30"],
  ["SyntaxError", "Unexpected token in production.", "friday.ts:17:59"],
  ["ReferenceError", "documentation is not defined.", "README.md:0:0"],
  ["Warning", "Each child in a list should have a unique key. Also a purpose.", "life.tsx:3:8"],
];

const fixes = [
  "Fixed. Added a comment that says // don't touch this.",
  "Fixed by turning it off and on again. Classic.",
  "Resolved. Two new bugs have entered the chat.",
  "Patched. Marked as 'won't fix' in spirit only.",
  "Fixed. It was a missing semicolon. It's always a missing semicolon.",
];

type Line = { id: number; kind: "error" | "fix" | "info"; text: string; at?: string };

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export default function BugTerminal() {
  const [lines, setLines] = useState<Line[]>([{ id: 0, kind: "info", text: "$ npm run production --confidently" }]);
  const [openBugs, setOpenBugs] = useState(0);
  const nextId = useRef(1);

  const push = (line: Omit<Line, "id">) => setLines((current) => [...current, { ...line, id: nextId.current++ }].slice(-7));

  const generate = () => {
    const [type, text, at] = pick(bugs);
    push({ kind: "error", text: `${type}: ${text}`, at });
    setOpenBugs((count) => count + 1);
  };

  const fix = () => {
    if (openBugs === 0) {
      push({ kind: "info", text: "Nothing to fix. Which is honestly more suspicious." });
      return;
    }
    push({ kind: "fix", text: pick(fixes) });
    setOpenBugs((count) => count - 1);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden border-2 border-ink bg-night text-paper">
        <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2">
          <span className="annot text-paper/60">production.log</span>
          <span className="annot text-paper/60">
            open bugs: <span className={openBugs ? "text-signal" : "text-lime"}>{openBugs}</span>
          </span>
        </div>
        <ol className="min-h-60 space-y-2 p-4 font-mono text-[0.78rem] leading-relaxed" aria-live="polite">
          {lines.map((line) => (
            <li key={line.id}>
              {line.kind === "error" && <span className="text-signal">✖ {line.text}</span>}
              {line.kind === "fix" && <span className="text-lime">✔ {line.text}</span>}
              {line.kind === "info" && <span className="text-paper/60">{line.text}</span>}
              {line.at && <span className="block pl-4 text-paper/40">at {line.at}</span>}
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={generate} className="btn btn-primary">
          Generate a bug
        </button>
        <button type="button" onClick={fix} className="btn btn-ghost">
          Fix bug
        </button>
      </div>
    </div>
  );
}
