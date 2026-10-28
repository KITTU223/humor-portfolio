"use client";

import { useEffect, useRef, useState } from "react";
import { aiSuggestions, askUselessAi } from "@/data/uselessAi";

type Exchange = { id: number; question: string; answer?: string };

const THINKING_MS = 650;

export default function UselessAI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Exchange[]>([]);
  const timer = useRef<number>(undefined);
  const nextId = useRef(0);
  const thinking = history.at(-1)?.answer === undefined && history.length > 0;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || thinking) return;
    const id = nextId.current++;
    setHistory((current) => [...current.slice(-2), { id, question: trimmed }]);
    setInput("");
    timer.current = window.setTimeout(() => {
      const answer = askUselessAi(trimmed);
      setHistory((current) => current.map((item) => (item.id === id ? { ...item, answer } : item)));
    }, THINKING_MS);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-56 flex-1 space-y-4" aria-live="polite">
        {history.length === 0 && (
          <p className="font-serif text-xl text-muted italic">It knows nothing. It&apos;s very confident about it.</p>
        )}
        {history.map((item) => (
          <div key={item.id} className="space-y-2">
            <p className="ml-auto w-fit max-w-[85%] bg-ink px-4 py-2 text-paper">{item.question}</p>
            <p className="w-fit max-w-[85%] border-2 border-ink bg-lime px-4 py-2 font-medium">
              {item.answer ?? <span className="font-mono text-sm">Consulting a sticky note…</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {aiSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => ask(suggestion)}
            className="min-h-10 rounded-full border border-ink/40 px-3 text-sm transition-colors hover:border-ink hover:bg-paper-deep"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="useless-ai" className="sr-only">
          Ask my extremely unqualified AI
        </label>
        <input
          id="useless-ai"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask something profound..."
          maxLength={140}
          autoComplete="off"
          className="min-h-12 min-w-0 flex-1 border-2 border-ink bg-paper px-4 placeholder:text-muted focus:bg-white focus:outline-none focus-visible:outline-3 focus-visible:outline-blue"
        />
        <button type="submit" className="btn btn-primary shrink-0 px-5" disabled={thinking}>
          Ask
        </button>
      </form>
      <p className="annot mt-3 text-muted">Powered by if-statements. Not an LLM. Not even a little bit.</p>
    </div>
  );
}
