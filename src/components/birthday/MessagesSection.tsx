import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Typewriter({ text, start, speed = 38 }: { text: string; start: boolean; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [start, text, speed]);
  return (
    <span>
      {out}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-0.5 text-rose"
      >
        |
      </motion.span>
    </span>
  );
}

const MESSAGES = [
  "you make ordinary days feel like poetry.",
  "you are one of the most precious people in my life.",
  "the world is softer because you exist in it.",
  "i hope this year brings you endless reasons to smile.",
];

export function MessagesSection() {
  return (
    <section className="relative px-6 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display mx-auto max-w-2xl text-center text-3xl italic text-foreground/85 sm:text-5xl"
      >
        a few things i wanted to <span className="text-gradient-rose">whisper</span> to you
      </motion.h2>

      <div className="mx-auto mt-20 flex max-w-2xl flex-col gap-10">
        {MESSAGES.map((m, i) => (
          <MessageLine key={i} text={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function MessageLine({ text, index }: { text: string; index: number }) {
  const [seen, setSeen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1, delay: 0.1 }}
      onViewportEnter={() => setSeen(true)}
      className={`glass rounded-3xl p-7 sm:p-9 ${index % 2 ? "sm:ml-12" : "sm:mr-12"}`}
    >
      <p className="font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        <Typewriter text={text} start={seen} />
      </p>
    </motion.div>
  );
}