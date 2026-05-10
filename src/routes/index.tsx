import { Finale } from "@/components/birthday/Finale";
import { InteractiveSurprises } from "@/components/birthday/InteractiveSurprises";
import { LoadingScreen } from "@/components/birthday/LoadingScreen";
import { MemoryTimeline } from "@/components/birthday/MemoryTimeline";
import { MessagesSection } from "@/components/birthday/MessagesSection";
import { OpeningScreen } from "@/components/birthday/OpeningScreen";
import { StarField } from "@/components/birthday/Particles";
import { WishCake } from "@/components/birthday/WishCake";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Personalize here ↓
const NAME = "Roshni";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `A Birthday Surprise for ${NAME}` },
      {
        name: "description",
        content: "A cinematic, interactive birthday experience. Open to begin the journey.",
      },
      { property: "og:title", content: `A Birthday Surprise for ${NAME}` },
      {
        property: "og:description",
        content: "A magical, interactive birthday experience made just for you.",
      },
      { name: "theme-color", content: "#1a0f24" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <StarField />

      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="open"
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
            transition={{ duration: 1 }}
          >
            <OpeningScreen name={NAME} onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <WishCake />
            <MessagesSection />
            <InteractiveSurprises name={NAME} />
            <MemoryTimeline />
            <Finale name={NAME} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
