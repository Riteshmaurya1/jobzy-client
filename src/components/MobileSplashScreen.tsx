"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant timing: 2.8 seconds total before exit
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const text = "JobZy";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Clean white background with elegant blur & scale exit
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white md:hidden overflow-hidden"
        >
          <div className="flex flex-col items-center gap-6 perspective-[1000px]">
            {/* Staggered Letter Reveal for JobZy */}
            <div className="flex space-x-0.5 overflow-hidden pb-2 pt-2">
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.2, 0.65, 0.3, 0.9], // Custom cubic-bezier for a snapping premium feel
                    delay: index * 0.08,
                  }}
                  className="inline-block text-6xl font-display font-black text-neutral-950 tracking-tighter origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Premium Rounded Black Element with a sleek loading sweep */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="relative h-2 rounded-full bg-neutral-950 shadow-2xl shadow-black/20 overflow-hidden flex items-center"
            >
              {/* Animated Sheen / Glare that passes over the pill */}
              <motion.div
                initial={{ x: "-150%" }}
                animate={{ x: "200%" }}
                transition={{ delay: 1.1, duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
