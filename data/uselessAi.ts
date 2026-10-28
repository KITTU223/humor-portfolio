// A keyword matcher wearing a trench coat. First matching rule wins.
export const aiRules: { match: RegExp; reply: string }[] = [
  {
    match: /replace.*(dev|programmer|engineer)|(take|steal).*job/i,
    reply: "Possibly. But first it needs to stop inventing npm packages.",
  },
  {
    match: /hire|krutarth|work with (you|him)/i,
    reply: "I have absolutely no conflict of interest. Yes.",
  },
  { match: /meaning of life|purpose/i, reply: "42. Plus GST." },
  {
    match: /are you (an? )?(ai|real|llm|gpt|robot)|who are you|what are you/i,
    reply:
      "I'm about fifteen if-statements in a trench coat. No language models were harmed.",
  },
  {
    match: /center|centre|div|css/i,
    reply:
      "display: grid; place-items: center. You're welcome. That'll be one consultation.",
  },
  {
    match: /bug|error|broken|fix/i,
    reply:
      "Have you tried the bug generator next door? It's very productive. Wrong direction, but productive.",
  },
  {
    match: /price|cost|rate|budget|quote|money/i,
    reply:
      "Depends on scope. That's not a dodge, that's consulting. The contact section has the real answer.",
  },
  {
    match: /f1|formula|ferrari|verstappen|hamilton|race/i,
    reply: "Box, box. The strategy team says this question is a two-stop.",
  },
  {
    match: /cricket|ipl|wicket|kohli/i,
    reply: "My prediction: it'll rain at exactly the wrong moment.",
  },
  {
    match: /javascript|typescript|react|next/i,
    reply:
      "Great choice. In about six months there'll be a newer great choice.",
  },
  {
    match: /sleep|tired|coffee|chai/i,
    reply: "Sleep is a feature scheduled for a future release.",
  },
  {
    match: /joke|funny|laugh/i,
    reply: "This entire section is the joke. You're standing in it.",
  },
  {
    match: /weather|rain|temperature/i,
    reply:
      "It's either hot or about to be. I'm from Gujarat; that's the forecast.",
  },
  {
    match: /^(hi|hello|hey|yo|namaste)\b/i,
    reply:
      "Hello. I've been waiting here, unemployed, for exactly this moment.",
  },
];

export const aiFallbacks = [
  "Great question. I'll answer it in the next sprint.",
  "I consulted my training data, which is one sticky note. It says 'no idea'.",
  "Have you tried turning the question off and on again?",
  "That's above my pay grade. My pay grade is zero.",
  "I could answer that, but then I'd have to invoice you.",
];

export const aiSuggestions = [
  "Will AI replace developers?",
  "Should I hire Krutarth?",
  "What is the meaning of life?",
];

export function askUselessAi(question: string) {
  const rule = aiRules.find(({ match }) => match.test(question));
  return (
    rule?.reply ?? aiFallbacks[Math.floor(Math.random() * aiFallbacks.length)]
  );
}
