"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <a href={`mailto:${email}`} className="font-display text-[clamp(1.6rem,5vw,3.5rem)] break-all underline decoration-2 underline-offset-8 hover:text-blue">
        {email}
      </a>
      <button type="button" onClick={copy} className="btn btn-ghost min-h-11 px-4" aria-label={`Copy ${email} to clipboard`}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === "copied" ? "Copied" : "Copy"}
      </button>
      <p aria-live="polite" className="w-full font-mono text-xs uppercase">
        {status === "copied" && "Copied. The hard part is over."}
        {status === "failed" && "Your browser said no. The email link above still works."}
      </p>
    </div>
  );
}
