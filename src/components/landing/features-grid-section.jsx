import React from "react";

export function FeaturesGridSection() {
  const features = [
    {
      title: "Smart reminders",
      body: "Never miss an interview or follow‑up. JobZy nudges you before it is too late.",
    },
    {
      title: "ATS & resume hints",
      body: "Understand how well your resume matches the job with keyword‑level hints.",
    },
    {
      title: "Notes & documents",
      body: "Store your questions, recruiter details and documents right inside each job card.",
    },
    {
      title: "Multi‑view pipeline",
      body: "Switch between Kanban, list and calendar views as your job search grows.",
    },
  ];

  return (
    <section id="features" className="flex w-full justify-center px-4 py-16">
      <div className="w-full max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Features designed for how job search actually works.
          </h2>
          <p className="text-sm text-slate-200/80 sm:text-base">
            No HR jargon. Just the tools you need to manage your own job hunt
            like a pro.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_0_35px_rgba(15,23,42,0.7)]"
            >
              <h3 className="mb-2 text-sm font-semibold text-slate-50 sm:text-base">
                {f.title}
              </h3>
              <p className="text-xs text-slate-200/80 sm:text-sm">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
