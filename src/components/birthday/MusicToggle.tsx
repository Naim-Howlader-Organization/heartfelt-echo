import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

// Soft ambient piano loop (royalty-free, hosted by pixabay cdn)
const TRACK_URL =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e49bc6.mp3?filename=relaxing-145038.mp3";

export function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.35;
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        await a.play();
        setOn(true);
      } catch {
        /* autoplay blocked, ignore */
      }
    }
  };

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="glass fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition hover:scale-110 hover:text-rose"
      aria-label={on ? "Mute music" : "Play music"}
    >
      {on ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </motion.button>
  );
}