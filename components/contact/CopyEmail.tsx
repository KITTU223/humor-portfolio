"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { animate } from "animejs";
import { ease, prefersReducedMotion, springs } from "@/lib/anime";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [attempt, setAttempt] = useState(0);
  const iconRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  // Copied: the tick pops and the note is written out. Failed: the button shakes its head.
  useEffect(() => {
    if (status === "idle" || prefersReducedMotion()) return;
    if (status === "copied") {
      animate(iconRef.current!, { scale: [0, 1], rotate: [-45, 0], ease: springs.sticker() });
    } else {
      animate(buttonRef.current!, { translateX: [0, -6, 5, -3, 0], duration: 360, ease: "linear" });
    }
    animate(noteRef.current!, { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], duration: 450, ease: ease.paper });
  }, [status, attempt]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setAttempt((count) => count + 1);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <a href={`mailto:${email}`} className="font-display text-[clamp(1.6rem,5vw,3.5rem)] break-all underline decoration-2 underline-offset-8 hover:text-blue">
        {email}
      </a>
      <span ref={buttonRef} className="inline-block">
        <button type="button" onClick={copy} className="btn btn-ghost min-h-11 px-4" aria-label={`Copy ${email} to clipboard`}>
          <span ref={iconRef} className="inline-flex">
            {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          </span>
          {status === "copied" ? "Copied" : "Copy"}
        </button>
      </span>
      <p ref={noteRef} aria-live="polite" className="w-full font-mono text-xs uppercase">
        {status === "copied" && "Copied. The hard part is over."}
        {status === "failed" && "Your browser said no. The email link above still works."}
      </p>
    </div>
  );
}
