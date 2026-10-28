// Surprises triggered by typing `code` anywhere (outside inputs) or triple-tapping an element
// with data-egg-trigger="<code>". `mode` goes on <html data-egg> for CSS to react to.
// One line is picked at random each time.
export type EggDefinition = { code: string; mode: string; ms: number; typeable?: boolean; lines: string[] };

export const easterEggs: EggDefinition[] = [
  {
    code: "boxbox",
    mode: "pitstop",
    ms: 3200,
    typeable: true,
    lines: [
      "Box box! Pit stop done in 1.9s. Ferrari strategy is still deciding.",
      "Box box. We are checking… (we are not checking.)",
      "Lights out and away we go! Destination: the contact section.",
      "Plan A? Plan B? Plan F: hire Krutarth.",
      "Pit stop: 2.0s. Tyres: fresh. Deadlines: questionable.",
      "Bwoah. — every driver asked to review this website",
    ],
  },
  {
    code: "pushpa",
    mode: "pushpa",
    ms: 3200,
    typeable: true,
    // The logo's egg: one line per film, so repeat taps tour the whole filmography.
    lines: [
      "Krutarth naam sunke flower samjhe kya? Fire hai. Jhukega nahi.",
      "Kitne bug the? — Sardar, do the. Dono fix ho gaye.",
      "Mere paas green build hai, clean code hai. Tumhare paas kya hai?",
      "Deadline ko pakadna mushkil hi nahi, naamumkin hai.",
      "Rishte mein toh hum tumhare developer lagte hai, naam hai Krutarth.",
      "Thappad se darr nahi lagta sahab, merge conflict se lagta hai.",
      "Bade bade projects mein aisi chhoti chhoti bugs hoti rehti hai, Senorita.",
      "All is well. (Console mein 47 warnings hai.)",
      "Code ko haath lagane se pehle, tests se baat kar.",
      "Utha le re baba… mereko nahi, is bug ko.",
      "Picture abhi baaki hai, mere dost. Agle commit mein.",
      "How's the josh? High, sir! (Coffee ka kamaal hai.)",
    ],
  },
  {
    code: "surya",
    mode: "catch",
    ms: 3400,
    typeable: true,
    lines: [
      "Caught at the boundary. Barbados, 2024. Heart rate still recovering.",
      "That's OUT! Bug caught at the boundary before production.",
      "Boundary rope: untouched. Code review: also passed.",
      "Last-over pressure? Shipped anyway. T20 World Cup 2024 energy.",
      "Champions Trophy 2025 says hello. Trophy cabinet: getting crowded.",
    ],
  },
  {
    code: "code",
    mode: "code",
    ms: 3000,
    lines: [
      "Build failed. 12th Fail rule: Restart.",
      "It works. Nobody touch anything.",
      "git commit -m 'final_final_v3_actually_final'",
      "Tested in production. Bold strategy.",
      "Fixed it. Don't ask how. I also don't know.",
    ],
  },
  {
    code: "gaming",
    mode: "gaming",
    ms: 3000,
    lines: [
      "Achievement unlocked: clicked a card three times.",
      "Respawning… developer has 2 lives left.",
      "GG. No re. (Please re. I'm available for projects.)",
      "Loading next level: the contact section.",
      "Speedrun record: three taps. Any% glitchless.",
    ],
  },
  {
    code: "business",
    mode: "business",
    ms: 3000,
    lines: [
      "Shark Tank India verdict: 'Main iss deal mein hoon.'",
      "Invoice sent. Payment status: 'Bhai, next week pakka.'",
      "Valuation: priceless. Rates: very reasonable.",
      "Synergy achieved. Nobody knows what that means.",
      "Ye sab doglapan hai! (It isn't. The pricing is fair.)",
    ],
  },
  {
    code: "ai",
    mode: "ai",
    ms: 3000,
    lines: [
      "Robot uprising postponed. The sprint ran over.",
      "Hallucination detected: you thought this was a normal card.",
      "As a large language model, I'd also hire Krutarth.",
      "Woh AI hai, woh kuch bhi kar sakti hai. (Mostly autocomplete.)",
      "I've been trained on this tap. Please stop.",
    ],
  },
];

export const konamiEgg: EggDefinition = {
  code: "konami",
  mode: "dramatic",
  ms: 6000,
  lines: ["Developer mode: unnecessarily dramatic."],
};
