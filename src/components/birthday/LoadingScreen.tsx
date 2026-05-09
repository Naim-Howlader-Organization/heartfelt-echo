import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative h-24 w-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border border-rose/30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-rose glow-rose" />
          <div className="absolute inset-3 rounded-full border border-gold/40" />
        </motion.div>
        <motion.p
          className="font-display text-xl italic text-foreground/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          preparing something special…
        </motion.p>
      </div>
    </motion.div>
  );
}