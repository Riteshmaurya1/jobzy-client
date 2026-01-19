"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FeatureGrid = ({ items, className }) => {
    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                className
            )}
        >
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    variants={variants}
                    className="group relative p-6 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                        <div className="mb-4 text-3xl">{item.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
