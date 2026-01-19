"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GradientBorder = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={cn(
                "relative p-6 rounded-2xl group",
                className
            )}
        >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <div className="relative bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-slate-700 transition-colors duration-300">
                {children}
            </div>
        </motion.div>
    );
};
