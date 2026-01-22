"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export const TextGenerateEffect = ({
    words,
    className,
    textClassName,
}: {
    words: string;
    className?: string;
    textClassName?: string;
}) => {
    const { theme } = useTheme();
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 2,
                delay: stagger(0.2),
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={`opacity-0 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                            style={{ fontFamily: 'var(--font-body), Inter, sans-serif' }}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-normal", className)}>
            <div className="mt-4">
                <div className={`text-2xl leading-relaxed tracking-tight font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                    style={{ fontFamily: 'var(--font-body), Inter, sans-serif' }}>
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
