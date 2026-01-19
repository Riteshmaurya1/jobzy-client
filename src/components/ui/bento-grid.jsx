"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ children, className }) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    span = 1,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
                "relative row-span-1 rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900 to-slate-950 p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 group",
                "lg:col-span-" + span,
                className
            )}
        >
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
                        <h3 className="text-lg font-bold text-white">{description}</h3>
                    </div>
                    {icon && <div className="text-2xl">{icon}</div>}
                </div>
                {header && <div className="mt-4">{header}</div>}
            </div>
        </motion.div>
    );
};
