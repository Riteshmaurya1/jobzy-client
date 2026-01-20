import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCTA() {
    return (
        <section className="flex w-full justify-center px-4 pb-24">
            <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-2xl shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                <h2 className="text-xl font-semibold sm:text-2xl">
                    Ready to stop losing track of opportunities?
                </h2>
                <p className="mt-2 text-sm text-slate-200/80 sm:text-base">
                    Turn your job search into a system you can control, instead of a mess
                    of tabs and screenshots.
                </p>
                <div className="mt-5 flex justify-center">
                    <Button
                        className={cn(
                            "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400",
                            "text-xs font-semibold text-slate-950 shadow-[0_0_25px_rgba(129,140,248,0.9)] hover:opacity-90 sm:text-sm"
                        )}
                        asChild
                    >
                        <a href="/signup">Start for free</a>
                    </Button>
                </div>
                <p className="mt-2 text-[11px] text-slate-300/80 sm:text-xs">
                    No credit card. Cancel anytime.
                </p>
            </div>
        </section>
    );
}
