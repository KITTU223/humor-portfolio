"use client";

import type { Scope } from "animejs";
import { sweepMarkers } from "@/lib/anime";
import { useAnimeScope } from "@/hooks/useAnimeScope";

const sweep = (scope: Scope) => sweepMarkers(scope, scope.root as HTMLElement);

// For sections whose only Anime.js moment is a highlighted heading word.
export default function MarkerSweep({ root }: { root: string }) {
  useAnimeScope(root, sweep);
  return null;
}
