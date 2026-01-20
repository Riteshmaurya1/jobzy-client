import React from "react";
import { cn } from "@/lib/utils";

export function ProductPreviewSection() {
  return (
    <section id="product" className="flex w-full justify-center px-4 py-16">
      <div className="w-full max-w-5xl grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold sm:text-2xl">
            A single dashboard for every application detail.
          </h2>
          <p className="text-sm text-slate-200/80 sm:text-base">
            Track status, notes, resume versions, follow‑ups and interviews for
            every job in one place instead of scattered tabs and docs.
          </p>

          <ul className="space-y-2 text-sm text-slate-200/80">
            <li>• Timeline of updates for each application.</li>
            <li>• Attach notes, questions and documents per job.</li>
            <li>• See upcoming interviews and follow‑ups in one glance.</li>
          </ul>
          </div>

        <div
          className={cn(
            "relative rounded-3xl border border-white/15 bg-slate-950/70 p-4",
            "backdrop-blur-3xl shadow-[0_0_50px_rgba(15,23,42,0.9)]"
          )}
        >
          <div className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-200">
                <span className="font-medium">Applications</span>
                <span className="text-slate-400">This month</span>
              </div>
              <JobRow
                title="SDE – Fintech Co."
                company="Bangalore • Applied"
              />
              <JobRow
                title="Backend Engineer – SaaS"
                company="Remote • Interview"
              />
              <JobRow
                title="Full‑stack Developer – Startup"
                company="Hybrid • Offer"
              />
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-[11px] text-slate-200">
                <span className="font-medium">Job details</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
                  Interview
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-200/80">
                <div className="text-slate-50">
                  Backend Engineer – SaaS platform
                </div>
                <div className="text-slate-400">
                  Company: DevStack Labs • Remote
                </div>
                <div className="text-slate-400">
                  Next: Interview • 25 Jan • 4:30 PM
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-slate-950/70 p-3">
                <div className="mb-1 text-[11px] text-slate-300/90">
                  Notes
                </div>
                <p className="text-[11px] text-slate-300/80">
                  Focus on system design basics, Node.js performance, and
                  demonstrate ownership of previous projects.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-200/80">
                <MiniTag label="Resume v3.pdf" />
                <MiniTag label="Job description" />
                <MiniTag label="Company research" />
                <MiniTag label="Follow‑up email template" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JobRow({ title, company }) {
  return (
    <div className="rounded-xl bg-slate-950/70 px-3 py-2">
      <div className="truncate text-[11px] text-slate-50">{title}</div>
      <div className="text-[10px] text-slate-400">{company}</div>
    </div>
  );
}

function MiniTag({ label }) {
  return (
    <div className="truncate rounded-full border border-white/15 bg-white/5 px-2 py-1">
      {label}
    </div>
  );
}
