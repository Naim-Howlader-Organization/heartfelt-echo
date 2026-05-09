import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Particles } from "./Particles";

export function OpeningScreen({ onOpen, name }: { onOpen: () => void; name: string }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Particles count={22} variant="sparkles" />

      <motion.p
        className="mb-6 text-xs uppercase tracking-[0.4em] text-foreground/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        a quiet little surprise
      </motion.p>

      <motion.h1
        className="font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl"
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block italic text-foreground/80">Someone made this</span>
        <span className="text-gradient-rose mt-2 block">just for you…</span>
      </motion.h1>

      <motion.p
        className="mt-8 max-w-md text-balance text-base text-foreground/65 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2 }}
      >
        because you, {name}, are truly special. take a breath, and step inside.
      </motion.p>

      <motion.button
        onClick={onOpen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="glass glow-rose group relative mt-12 overflow-hidden rounded-full px-8 py-4 text-sm tracking-wide text-foreground"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          Open Your Birthday Surprise
          <Sparkles className="h-4 w-4 text-gold" />
        </span>
        <span className="shimmer absolute inset-0" />
      </motion.button>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className="text-xs tracking-[0.3em]">scroll begins after you tap</span>
      </motion.div>
    </section>
  );
}