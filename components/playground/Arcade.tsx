"use client";

import dynamic from "next/dynamic";

// The game is the heaviest experiment, so it only downloads on the client.
const BugCatcher = dynamic(() => import("./BugCatcher"), {
  ssr: false,
  loading: () => <div className="h-[22rem] animate-pulse border-2 border-ink bg-paper-deep sm:h-[26rem]" />,
});

export default function Arcade() {
  return <BugCatcher />;
}
