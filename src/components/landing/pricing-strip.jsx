import React from "react";

export function PricingStrip() {
    const plans = [
        {
            name: "Free",
            tag: "Start here",
            body: "Perfect for starting your job search and testing JobZy.",
        },
        {
            name: "Pro",
            tag: "Coming soon",
            body: "Advanced tracking and insights for aggressive job hunters.",
        },
        {
            name: "Super Pro",
            tag: "Coming soon",
            body: "For power users managing multiple interviews at once.",
        },
    ];

    return (
        <section id="pricing" className="flex w-full justify-center px-4 pb-16">
            <div className="w-full max-w-5xl space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">
                            Start free. Upgrade only when you are ready.
                        </h2>
                        <p className="text-sm text-slate-200/80">
                            Focus on landing offers first. You can think about upgrading
                            later.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="text-xs text-indigo-200 underline-offset-4 hover:underline sm:text-sm"
                    >
                        View full pricing (soon)
                    </button>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className="space-y-2 rounded-2xl border border-white/15 bg-slate-950/60 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-slate-50">
                                    {p.name}
                                </div>
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-200">
                                    {p.tag}
                                </span>
                            </div>
                            <p className="text-xs text-slate-200/80">{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
