import React from "react";
import { cn } from "@/lib/utils";

export function PipelineSection() {
  const steps = [
    {
      title: "Capture every opportunity",
      body: "Save jobs from any portal into JobZy so nothing gets lost in tabs, notes or screenshots.",
    },
    {
      title: "Organize into stages",
      body: "View your search as a pipeline: Applied, Interview, Offer, Rejected, Joined.",
    },
    {
      title: "Never miss a follow‑up",
      body: "Set follow‑up and interview reminders so you always know what to do next.",
    },
    {
      title: "Review & improve",
      body: "See patterns in your pipeline and find where you drop off so you can adjust.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="flex w-full justify-center px-4 py-16"
    >
      <div className="w-full max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Your entire job search, visualized like a pipeline.
          </h2>
          <p className="text-sm text-slate-200/80 sm:text-base">
            Move every application from “Applied” to “Joined” with a workflow
            that actually makes sense for job seekers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-4",
                "backdrop-blur-2xl shadow-[0_0_35px_rgba(15,23,42,0.7)]"
              )}
            >
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-300/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px]">
                  {i + 1}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-semibold text-slate-50 sm:text-base">
                {step.title}
              </h3>
              <p className="text-xs text-slate-200/80 sm:text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
