import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Gift, Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

/* ---------- Gift Box ---------- */
function GiftBoxCard({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const fire = () => {
    setOpen(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#f5b7b1", "#f9e79f", "#fadbd8", "#ffffff"],
    });
  };
  return (
    <SurpriseCard title="open the little box">
      <div className="flex h-48 items-center justify-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="box"
              onClick={fire}
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 0, rotate: 20, opacity: 0 }}
              className="glass glow-rose flex h-28 w-28 items-center justify-center rounded-2xl"
            >
              <Gift className="h-10 w-10 text-rose" />
            </motion.button>
          ) : (
            <motion.div
              key="msg"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="font-script text-3xl text-gradient-rose">happy birthday, {name}</p>
              <p className="mt-2 text-sm text-foreground/60">consider this a tiny hug.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SurpriseCard>
  );
}

/* ---------- Hold to Unlock ---------- */
function HoldToUnlock() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<number | null>(null);

  const start = () => {
    if (done) return;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(100, ((t - t0) / 1800) * 100);
      setProgress(p);
      if (p >= 100) {
        setDone(true);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        return;
      }
      ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (ref.current) cancelAnimationFrame(ref.current);
    if (!done) setProgress(0);
  };

  return (
    <SurpriseCard title="hold to reveal a wish">
      <div className="flex h-48 flex-col items-center justify-center gap-5">
        <button
          onMouseDown={start}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchEnd={stop}
          className="relative h-24 w-24 select-none rounded-full"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="44" stroke="oklch(1 0 0 / 0.1)" strokeWidth="4" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#hg)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(progress / 100) * 276.46} 276.46`}
              style={{ transition: "stroke-dasharray 60ms linear" }}
            />
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.16 18)" />
                <stop offset="100%" stopColor="oklch(0.85 0.12 85)" />
              </linearGradient>
            </defs>
          </svg>
          <Heart
            className={`absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 ${done ? "fill-rose text-rose" : "text-rose"}`}
          />
        </button>
        <p className="text-sm italic text-foreground/70">
          {done
            ? "“you are loved, more than words can hold.”"
            : "press & hold the heart…"}
        </p>
      </div>
    </SurpriseCard>
  );
}

/* ---------- Scratch Card ---------- */
function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const w = (c.width = c.offsetWidth * devicePixelRatio);
    const h = (c.height = c.offsetHeight * devicePixelRatio);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#5a3a55");
    grad.addColorStop(1, "#3a2a45");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `${14 * devicePixelRatio}px Inter`;
    ctx.textAlign = "center";
    ctx.fillText("scratch here ✨", w / 2, h / 2);
  }, []);

  const scratch = (x: number, y: number) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const rect = c.getBoundingClientRect();
    const px = ((x - rect.left) / rect.width) * c.width;
    const py = ((y - rect.top) / rect.height) * c.height;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(px, py, 28 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
    // check
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4 * 50) if (data[i] === 0) cleared++;
    const ratio = cleared / (data.length / (4 * 50));
    if (ratio > 0.45 && !revealed) setRevealed(true);
  };

  return (
    <SurpriseCard title="scratch the secret">
      <div className="relative mx-auto h-48 w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-rose/20 to-gold/20 p-4 text-center">
          <Sparkles className="mb-2 h-6 w-6 text-gold" />
          <p className="font-display text-xl italic text-gradient-gold">you are my favourite kind of magic.</p>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0" : "opacity-100"}`}
          onMouseDown={(e) => {
            drawing.current = true;
            scratch(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onMouseUp={() => (drawing.current = false)}
          onMouseLeave={() => (drawing.current = false)}
          onTouchStart={(e) => scratch(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => scratch(e.touches[0].clientX, e.touches[0].clientY)}
        />
      </div>
    </SurpriseCard>
  );
}

/* ---------- Balloons ---------- */
function Balloons() {
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const balloons = [
    { color: "oklch(0.78 0.16 18)", left: 10 },
    { color: "oklch(0.85 0.12 85)", left: 30 },
    { color: "oklch(0.78 0.08 300)", left: 50 },
    { color: "oklch(0.86 0.08 20)", left: 70 },
    { color: "oklch(0.82 0.14 75)", left: 88 },
  ];
  const allPopped = popped.size === balloons.length;

  return (
    <SurpriseCard title="pop a little joy">
      <div className="relative h-48 w-full overflow-hidden">
        {balloons.map((b, i) => {
          const isPopped = popped.has(i);
          return (
            <motion.button
              key={i}
              onClick={() => {
                setPopped((s) => new Set(s).add(i));
                confetti({
                  particleCount: 30,
                  spread: 50,
                  origin: { x: b.left / 100, y: 0.6 },
                });
              }}
              animate={isPopped ? { scale: 0, opacity: 0 } : { y: [0, -10, 0] }}
              transition={isPopped ? { duration: 0.3 } : { duration: 3 + i * 0.3, repeat: Infinity }}
              className="absolute bottom-2"
              style={{ left: `${b.left}%` }}
            >
              <div
                className="h-14 w-11 rounded-full shadow-lg"
                style={{ background: `radial-gradient(circle at 30% 30%, white, ${b.color})` }}
              />
              <div className="mx-auto h-10 w-px bg-white/30" />
            </motion.button>
          );
        })}
        {allPopped && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-script text-2xl text-gradient-rose"
          >
            yay! you found them all 🎈
          </motion.p>
        )}
      </div>
    </SurpriseCard>
  );
}

/* ---------- Wrapper Card ---------- */
function SurpriseCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
      className="glass rounded-3xl p-6 sm:p-8"
    >
      <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-foreground/55">{title}</p>
      {children}
    </motion.div>
  );
}

export function InteractiveSurprises({ name }: { name: string }) {
  return (
    <section className="relative px-6 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display mx-auto max-w-2xl text-center text-3xl italic sm:text-5xl"
      >
        little <span className="text-gradient-gold">surprises</span>, made for you
      </motion.h2>
      <p className="mx-auto mt-4 max-w-md text-center text-sm text-foreground/60">
        tap, hold, scratch, pop — every interaction is a tiny wish.
      </p>
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
        <GiftBoxCard name={name} />
        <HoldToUnlock />
        <ScratchCard />
        <Balloons />
      </div>
    </section>
  );
}