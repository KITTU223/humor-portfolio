import CodeVisual from "./visuals/CodeVisual";
import F1Visual from "./visuals/F1Visual";
import CricketVisual from "./visuals/CricketVisual";
import GamingVisual from "./visuals/GamingVisual";
import BusinessVisual from "./visuals/BusinessVisual";
import AIVisual from "./visuals/AIVisual";
import styles from "./Cards.module.css";

const cards = [
  { title: "Code", egg: "code", caption: "Because apparently staring at a screen is a career.", Visual: CodeVisual },
  { title: "Formula 1", egg: "boxbox", caption: "I appreciate precision, engineering, and shouting at strategy decisions.", Visual: F1Visual },
  { title: "Cricket", egg: "surya", caption: "Strategic thinking, questionable predictions.", Visual: CricketVisual },
  { title: "Gaming", egg: "gaming", caption: "Professional button presser. Amateur decision maker.", Visual: GamingVisual },
  { title: "Business", egg: "business", caption: "Turning ideas into products and coffee into invoices.", Visual: BusinessVisual },
  { title: "AI", egg: "ai", caption: "Making machines useful before they start judging us.", Visual: AIVisual },
];

export default function PersonalityCards() {
  return (
    <ul className={styles.grid}>
      {cards.map(({ title, caption, Visual, egg }, index) => (
        <li key={title} data-reveal="fade">
          <article tabIndex={0} data-egg-trigger={egg} className={styles.card} aria-labelledby={`card-${index}`}>
            <div className="flex items-baseline justify-between">
              <span className="annot text-muted">
                0{index + 1} <span className={styles.tapHint}>· tap ×3</span>
              </span>
              <h3 id={`card-${index}`} className="text-3xl">
                {title}
              </h3>
            </div>
            <Visual />
            <p className="font-serif text-xl leading-snug italic">{caption}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
