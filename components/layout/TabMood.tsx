"use client";

import { useEffect } from "react";

const awayTitles = [
  "Come back, I was mid-sentence.",
  "404: Your attention not found.",
  "Your other tabs are less fun.",
  "Still here. Still hireable.",
  "Did you just alt-tab on me?",
  "I'll just wait here then. Fine.",
];
const BACK_TITLE = "Oh, you're back! Act natural.";
const BACK_MS = 2200;

// The logo K, asleep: eye shut, a little "z".
const sleepingIcon = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><rect x="5" y="5" width="38" height="38" fill="#171717"/><rect x="1.5" y="1.5" width="38" height="38" fill="#d9ff43" stroke="#171717" stroke-width="3"/><path d="M15 8v26M18 21 30 9M20 20l11 14" stroke="#171717" stroke-width="6.5"/><path d="M13.3 12.8h3.4" stroke="#d9ff43" stroke-width="1.2"/><path d="M27 23h7l-7 8h7" fill="none" stroke="#4355f5" stroke-width="2.4"/></svg>`,
)}`;

export default function TabMood() {
  useEffect(() => {
    let title = document.title;
    let timer: number | undefined;
    const icons = [...document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')];
    const originalIcons = icons.map((icon) => icon.href);

    const onVisibility = () => {
      window.clearTimeout(timer);
      if (document.hidden) {
        title = document.title;
        document.title = awayTitles[Math.floor(Math.random() * awayTitles.length)];
        icons.forEach((icon) => (icon.href = sleepingIcon));
        return;
      }
      icons.forEach((icon, i) => (icon.href = originalIcons[i]));
      document.title = BACK_TITLE;
      timer = window.setTimeout(() => (document.title = title), BACK_MS);
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
