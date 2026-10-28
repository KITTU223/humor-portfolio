import styles from "./BrandMark.module.css";

// The "K" is secretly a stick figure: a body, an arm that waves and a leg that taps.
// All motion is CSS, driven by hovering the surrounding brand link.
export default function BrandMark() {
  return (
    <span className={styles.mark} aria-hidden="true" data-egg-trigger="pushpa">
      <svg viewBox="0 0 40 40" className={styles.svg}>
        <line className={styles.body} x1="14" y1="8" x2="14" y2="32" />
        <line className={styles.arm} x1="17" y1="20" x2="28" y2="9" />
        <line className={styles.leg} x1="19" y1="19" x2="29" y2="32" />
        <ellipse className={styles.eye} cx="14" cy="12" rx="1.3" ry="1.6" />
      </svg>
    </span>
  );
}
