import { motion } from "framer-motion";

const MOMENTS = [
  {
    year: "then",
    title: "the day our paths crossed",
    note: "some people arrive quietly and still manage to change the feeling of everything.",
  },
  {
    year: "later",
    title: "all the in-between moments",
    note: "the random talks, shared laughs, and little memories that stayed longer than expected.",
  },
  {
    year: "this year",
    title: "the way you kept going",
    note: "even on difficult days, you still carried light with you. not everyone can do that.",
  },
  {
    year: "tomorrow",
    title: "everything still waiting ahead",
    note: "whatever comes next, i know it’ll be beautiful with you in the story.",
  },
];

export function MemoryTimeline() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-display mx-auto max-w-2xl text-center text-2xl italic sm:text-4xl md:text-5xl"
      >
        a small <span className="text-gradient-rose">timeline</span> of you
      </motion.h2>

      <div className="relative mx-auto mt-12 max-w-3xl sm:mt-20">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-rose/40 to-transparent sm:left-1/2" />
        {MOMENTS.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9 }}
            className={`relative mb-12 flex w-full gap-6 sm:mb-16 sm:w-1/2 ${
              i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"
            } pl-12 sm:pl-0`}
          >
            <span
              className={`absolute top-3 h-3 w-3 rounded-full bg-rose glow-rose ${
                i % 2 ? "left-3 sm:-left-1.5" : "left-3 sm:-right-1.5 sm:left-auto"
              }`}
            />
            <div className="glass w-full rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">{m.year}</p>
              <h3 className="font-display mt-2 text-xl italic text-foreground/90">{m.title}</h3>
              <p className="mt-2 text-sm text-foreground/65">{m.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
