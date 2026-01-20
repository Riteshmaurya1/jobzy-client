"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function GlassNavbar() {
  const scrollTo = (id) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="sticky top-4 z-40 flex w-full justify-center px-4">
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full",
          "border border-white/15 bg-slate-900/50 px-4 py-2",
          "backdrop-blur-2xl shadow-[0_0_40px_rgba(15,23,42,0.7)]"
        )}
      >
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-xs font-bold shadow-[0_0_20px_rgba(129,140,248,0.9)]">
            JZ
          </div>
          <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-sm font-semibold tracking-wide text-transparent sm:text-base">
            JobZy
          </span>
        </button>

        <nav className="hidden items-center gap-6 text-xs text-slate-100/80 sm:flex sm:text-sm">
          <button
            type="button"
            onClick={() => scrollTo("product")}
            className="hover:text-white"
          >
            Product
          </button>
          <button
            type="button"
            onClick={() => scrollTo("how-it-works")}
            className="hover:text-white"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollTo("features")}
            className="hover:text-white"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollTo("pricing")}
            className="hover:text-white"
          >
            Pricing
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden border border-white/15 bg-white/5 text-xs text-slate-100 hover:bg-white/10 sm:inline-flex sm:text-sm"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>

          <Button
            className={cn(
              "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400",
              "text-[11px] font-semibold text-slate-950 shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:opacity-90 sm:text-xs"
            )}
            asChild
          >
            <Link href="/signup">Start for free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
