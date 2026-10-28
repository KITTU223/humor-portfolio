import Robot from "./Robot";
import styles from "./Cards.module.css";

function CodeVisual() {
  return (
    <div className={`${styles.visual} bg-night font-mono text-xs text-paper`}>
      <p>
        <span className="text-blue">const</span> sleep = <span className="text-signal">null</span>;
      </p>
      <p className={styles.typed}>{"// fixed: it was a typo (3h)"}</p>
    </div>
  );
}

function F1Visual() {
  return (
    <div className={`${styles.visual} bg-paper-deep`}>
      <svg viewBox="0 0 200 80" className={styles.track} aria-hidden="true">
        <path className={styles.trackBase} d="M10 60 C40 10 70 70 100 40 S160 10 190 50" />
        <path className={styles.racingLine} d="M10 60 C40 10 70 70 100 40 S160 10 190 50" pathLength="1" />
      </svg>
      <div className={styles.gauge} aria-hidden="true">
        <span className={styles.needle} />
      </div>
    </div>
  );
}

function CricketVisual() {
  return (
    <div className={`${styles.visual} ${styles.scoreboard} bg-[#1d3b2a] font-mono text-paper`}>
      <p className="annot text-paper/60">My predictions</p>
      <div className="mt-2 flex gap-6 text-sm">
        <p>
          RIGHT <span className="text-lime">02</span>
        </p>
        <p className="flex">
          WRONG&nbsp;
          <span className={styles.flip}>
            <span>47</span>
            <span>48</span>
          </span>
        </p>
      </div>
    </div>
  );
}

function GamingVisual() {
  return (
    <div className={`${styles.visual} ${styles.arcade} bg-blue font-mono text-paper`}>
      <p className={styles.pressStart}>PRESS START</p>
      <p className={styles.continue}>CONTINUE? 9</p>
    </div>
  );
}

function BusinessVisual() {
  return (
    <div className={`${styles.visual} bg-paper font-mono text-[0.7rem]`}>
      <p className="flex justify-between border-b border-dashed border-ink/30 pb-1">
        <span>Ideas → product</span>
        <span>₹ ∞</span>
      </p>
      <p className="flex justify-between pt-1">
        <span>Coffee consumed</span>
        <span>non-billable</span>
      </p>
      <span className={styles.stamp}>Paid</span>
    </div>
  );
}

function AIVisual() {
  return (
    <div className={`${styles.visual} grid place-items-center bg-lime`}>
      <Robot />
    </div>
  );
}

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
