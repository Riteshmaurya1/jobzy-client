"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="flex w-full justify-center px-4 pb-16 pt-24 sm:pt-28"
    >
      <div className="w-full max-w-5xl">
        <div
          className={cn(
            "grid gap-10 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-10",
            "backdrop-blur-3xl shadow-[0_0_60px_rgba(15,23,42,0.9)]",
            "md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
          )}
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] text-slate-100/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Early access • Built for serious job seekers
            </div>

            <div className="space-y-3">
              <h1 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
                Turn messy job search into a clear, trackable pipeline.
              </h1>
              <p className="text-sm text-slate-100/80 sm:text-base">
                JobZy keeps all your applications, follow‑ups, resumes and
                interviews in one clean dashboard so you never miss a chance at
                an offer.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                className={cn(
                  "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400",
                  "text-xs font-semibold text-slate-950 shadow-[0_0_25px_rgba(129,140,248,0.9)] hover:opacity-90 sm:text-sm"
                )}
                asChild
              >
                <a href="/signup">Start for free</a>
              </Button>

              <Button
                variant="outline"
                className="border-white/30 bg-white/5 text-xs text-slate-100 hover:bg-white/10 sm:text-sm"
                asChild
              >
                <button type="button">
                  <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Watch 60‑second demo
                </button>
              </Button>
            </div>

            <p className="text-[11px] text-slate-200/70 sm:text-xs">
              No credit card required. Add your first job in under 2 minutes.
            </p>

            <div className="grid gap-2 text-[11px] text-slate-100/80 sm:grid-cols-2 sm:text-xs">
              <FeaturePill text="Kanban‑style stages: Applied → Interview → Offer → Joined" />
              <FeaturePill text="Auto reminders for follow‑ups & interviews" />
              <FeaturePill text="ATS‑friendly resume & JD keyword hints" />
              <FeaturePill text="Notes & documents attached to every job" />
            </div>

            <div className="mt-2 space-y-1">
              <p className="text-xs text-slate-200/70">
                Loved by job seekers from top companies
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-300/70">
                <FakeLogo>Acme Corp</FakeLogo>
                <FakeLogo>DevStack Labs</FakeLogo>
                <FakeLogo>CodePeak</FakeLogo>
                <FakeLogo>TalentMint</FakeLogo>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute -right-4 bottom-4 h-24 w-24 rounded-full bg-fuchsia-500/30 blur-3xl" />

            <div
              className={cn(
                "relative mx-auto flex max-w-sm flex-col gap-3 rounded-2xl border border-white/15 bg-slate-950/70 p-4",
                "backdrop-blur-3xl shadow-[0_0_40px_rgba(15,23,42,0.9)]"
              )}
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] text-slate-100/80">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-50">
                    Today
                  </span>
                  <span className="text-[10px] text-emerald-300/90">
                    2 tasks
                  </span>
                </div>
                <div className="space-y-2">
                  <MiniRow
                    label="Interview • SDE – Company X"
                    meta="4:30 PM • Google Meet"
                  />
                  <MiniRow
                    label="Follow‑up • Backend Engineer – Company Y"
                    meta="2 days overdue • Send email"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-50">Pipeline</span>
                  <span className="text-[10px] text-slate-300/80">
                    14 active applications
                  </span>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <StageColumn
                    title="Applied"
                    count={5}
                    color="bg-sky-400/80"
                  />
                  <StageColumn
                    title="Interview"
                    count={3}
                    color="bg-indigo-400/80"
                  />
                  <StageColumn
                    title="Offer"
                    count={1}
                    color="bg-emerald-400/80"
                  />
                  <StageColumn
                    title="Rejected"
                    count={5}
                    color="bg-rose-400/80"
                  />
                </div>
              </div>

              <div className="flex gap-2 text-[11px]">
                <StatCard
                  label="Interviews this week"
                  value="3"
                  accent="from-indigo-400/70 to-cyan-400/60"
                />
                <StatCard
                  label="Follow‑ups pending"
                  value="5"
                  accent="from-amber-400/70 to-rose-400/60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>{text}</span>
    </div>
  );
}

function FakeLogo({ children }) {
  return (
    <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
      {children}
    </div>
  );
}

function MiniRow({ label, meta }) {
  return (
    <div className="rounded-lg bg-slate-900/60 px-3 py-2">
      <div className="truncate text-[11px] text-slate-50">{label}</div>
      <div className="text-[10px] text-slate-300/80">{meta}</div>
    </div>
  );
}

function StageColumn({ title, count, color }) {
  return (
    <div className="flex-1 rounded-lg bg-slate-900/70 p-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] text-slate-200">{title}</span>
        <span className="text-[10px] text-slate-400">{count}</span>
      </div>
      <div className={cn("h-1.5 w-full rounded-full bg-gradient-to-r", color)} />
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="flex-1 rounded-xl border border-white/15 bg-slate-900/70 p-3">
      <div className="text-[10px] text-slate-300/80">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-lg font-semibold text-transparent">
          {value}
        </span>
        <span
          className={cn(
            "ml-auto h-1.5 w-12 rounded-full bg-gradient-to-r",
            accent
          )}
        />
      </div>
    </div>
  );
}
