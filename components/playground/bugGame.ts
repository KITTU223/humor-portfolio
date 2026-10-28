type Bug = { x: number; y: number; angle: number; turn: number; step: number };
type Splat = { x: number; y: number; age: number };

export type Game = {
  start: () => void;
  pause: () => boolean;
  resume: () => void;
  destroy: () => void;
};

type Options = {
  slow: boolean;
  onScore: (score: number) => void;
  onEnd: () => void;
};

const DURATION = 10;
const HIT_RADIUS = 26;
const INK = "#171717";
const PAPER = "#f5f1e8";

// Plain canvas, one rAF loop that only runs while a round is being played.
export function createGame(
  canvas: HTMLCanvasElement,
  { slow, onScore, onEnd }: Options,
): Game {
  const ctx = canvas.getContext("2d")!;
  const speed = slow ? 55 : 150;
  let width = 0;
  let height = 0;
  let bugs: Bug[] = [];
  let splats: Splat[] = [];
  let running = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let score = 0;
  const aim = { x: 0, y: 0, visible: false };

  const spawn = (): Bug => ({
    x: 30 + Math.random() * (width - 60),
    y: 50 + Math.random() * (height - 80),
    angle: Math.random() * Math.PI * 2,
    turn: (Math.random() - 0.5) * 3,
    step: Math.random() * 10,
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (bugs.length === 0) bugs = Array.from({ length: 4 }, spawn);
    draw();
  }

  function update(dt: number) {
    elapsed += dt;
    const wanted = Math.min(4 + Math.floor(elapsed / 2), 9);
    while (bugs.length < wanted) bugs.push(spawn());

    for (const bug of bugs) {
      if (Math.random() < 0.02) bug.turn = (Math.random() - 0.5) * 4;
      bug.angle += bug.turn * dt;
      bug.x += Math.cos(bug.angle) * speed * dt;
      bug.y += Math.sin(bug.angle) * speed * dt;
      bug.step += dt * 18;
      if (bug.x < 16 || bug.x > width - 16) bug.angle = Math.PI - bug.angle;
      if (bug.y < 40 || bug.y > height - 16) bug.angle = -bug.angle;
      bug.x = Math.max(16, Math.min(width - 16, bug.x));
      bug.y = Math.max(40, Math.min(height - 16, bug.y));
    }
    splats = splats.filter((splat) => (splat.age += dt) < 0.5);
  }

  function drawBug(bug: Bug) {
    ctx.save();
    ctx.translate(bug.x, bug.y);
    ctx.rotate(bug.angle);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2;
    const wiggle = Math.sin(bug.step) * 3;
    for (const side of [-1, 1]) {
      for (const offset of [-6, 0, 6]) {
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + (offset === 0 ? wiggle : -wiggle), side * 13);
        ctx.stroke();
      }
    }
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(13, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff6438";
    ctx.beginPath();
    ctx.arc(-3, -3, 2.2, 0, Math.PI * 2);
    ctx.arc(3, 3, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(23,23,23,0.12)";
    for (let x = 12; x < width; x += 28)
      for (let y = 12; y < height; y += 28) ctx.fillRect(x, y, 2, 2);

    for (const splat of splats) {
      ctx.strokeStyle = `rgba(67,85,245,${1 - splat.age * 2})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(splat.x, splat.y, 10 + splat.age * 60, 0, Math.PI * 2);
      ctx.stroke();
    }
    bugs.forEach(drawBug);

    const remaining = Math.max(0, DURATION - elapsed);
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, width, 28);
    ctx.fillStyle = "#d9ff43";
    ctx.fillRect(0, 24, (width * remaining) / DURATION, 4);
    ctx.fillStyle = PAPER;
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillText(`TIME ${remaining.toFixed(1)}s`, 10, 17);
    ctx.fillText(`CAUGHT ${score}`, width - 90, 17);

    if (aim.visible) {
      ctx.strokeStyle = "#4355f5";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(aim.x, aim.y, 16, 0, Math.PI * 2);
      ctx.moveTo(aim.x - 24, aim.y);
      ctx.lineTo(aim.x + 24, aim.y);
      ctx.moveTo(aim.x, aim.y - 24);
      ctx.lineTo(aim.x, aim.y + 24);
      ctx.stroke();
    }
  }

  function loop(now: number) {
    update(Math.min((now - last) / 1000, 0.05));
    last = now;
    if (elapsed >= DURATION) {
      running = false;
      draw();
      onEnd();
      return;
    }
    draw();
    frame = requestAnimationFrame(loop);
  }

  function catchAt(x: number, y: number) {
    if (!running) return;
    const index = bugs.findIndex(
      (bug) => Math.hypot(bug.x - x, bug.y - y) < HIT_RADIUS,
    );
    if (index === -1) return;
    const [bug] = bugs.splice(index, 1);
    splats.push({ x: bug.x, y: bug.y, age: 0 });
    score += 1;
    onScore(score);
  }

  const onPointerDown = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    catchAt(event.clientX - rect.left, event.clientY - rect.top);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!running) return;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-24, 0],
      ArrowRight: [24, 0],
      ArrowUp: [0, -24],
      ArrowDown: [0, 24],
    };
    if (moves[event.key]) {
      event.preventDefault();
      aim.visible = true;
      aim.x = Math.max(0, Math.min(width, aim.x + moves[event.key][0]));
      aim.y = Math.max(28, Math.min(height, aim.y + moves[event.key][1]));
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      aim.visible = true;
      catchAt(aim.x, aim.y);
    }
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("keydown", onKeyDown);

  const run = () => {
    running = true;
    last = performance.now();
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(loop);
  };

  return {
    start() {
      bugs = Array.from({ length: 4 }, spawn);
      splats = [];
      score = 0;
      elapsed = 0;
      aim.x = width / 2;
      aim.y = height / 2;
      aim.visible = false;
      run();
    },
    pause() {
      if (!running) return false;
      running = false;
      cancelAnimationFrame(frame);
      return true;
    },
    resume() {
      if (!running && elapsed > 0 && elapsed < DURATION) run();
    },
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("keydown", onKeyDown);
    },
  };
}
