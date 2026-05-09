import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function nextBirthday(month: number, day: number) {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, month - 1, day, 0, 0, 0);
  if (target.getTime() < now.getTime()) {
    target = new Date(year + 1, month - 1, day);
  }
  return target;
}

export function Countdown({ month, day }: { month: number; day: number }) {
  const [diff, setDiff] = useState(() => nextBirthday(month, day).getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(nextBirthday(month, day).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [month, day]);

  const isToday = diff <= 0 || diff < 1000 * 60 * 60 * 24;
  const totalSec = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  const cells = [
    { label: "days", value: days },
    { label: "hours", value: hours },
    { label: "minutes", value: minutes },
    { label: "seconds", value: seconds },
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-xs uppercase tracking-[0.4em] text-foreground/50"
      >
        {isToday ? "today is the day" : "the moment is almost here"}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-display mt-4 text-4xl italic sm:text-6xl"
      >
        counting every <span className="text-gradient-gold">heartbeat</span>
      </motion.h2>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {cells.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
            className="glass relative w-28 rounded-2xl px-4 py-6 sm:w-36"
          >
            <div className="font-display text-4xl text-gradient-rose tabular-nums sm:text-5xl">
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-foreground/55">
              {c.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}