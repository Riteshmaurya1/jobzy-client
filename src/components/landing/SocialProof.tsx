"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export function SocialProof() {
    const { theme } = useTheme()

  const testimonials = [
  {
    quote: "Job search ka sabse bada issue ye hai ki apply kaha kiya, interview kab hai — sab scattered hota hai. Isliye hum JobZy bana rahe hain — job tracking + interview planner. Launching soon 🚀",
    name: "Ritesh Kumar",
    title: "Founder · JobZy"
  },
  {
    quote: "This looks promising. Managing applications and follow-ups is painful — a single dashboard like JobZy can genuinely save time.",
    name: "Naman Bansal",
    title: "Creator · Instagram"
  },
  {
    quote: "Finding your early audience is the hardest part. A product like this actually solves a real problem people talk about daily.",
    name: "Suraj Kumar",
    title: "Instagram User"
  },
  {
    quote: "Solid idea 🔥 Job tracking + interview planning in one place makes a lot of sense. Keep pushing, this has real potential.",
    name: "The Boring Founder",
    title: "Startup Creator · Instagram"
  },
  {
    quote: "Congratulations in advance bhai 🙌 This problem exists for almost every working professional. JobZy feels very relatable.",
    name: "Sudhanshu Kumar",
    title: "Instagram User"
  },
  {
    quote: "Honestly, tracking multiple applications manually is exhausting. Something like JobZy would have helped me a lot during my last job switch.",
    name: "Vijaya Sharma",
    title: "Software Engineer · LinkedIn"
  },
  {
    quote: "Clean concept. Resume versions + application tracking together is exactly what job seekers need right now.",
    name: "Jayant Mehra",
    title: "Frontend Developer · LinkedIn"
  },
  {
    quote: "Would love to see this live. Interview reminders alone can save people from missing important opportunities.",
    name: "Nitish Verma",
    title: "Product Analyst · LinkedIn"
  },
  {
    quote: "Good execution matters here, but the idea is strong. Centralized job tracking is overdue.",
    name: "Kushal Baid",
    title: "Growth Marketer · LinkedIn"
  },

  // --- Fake LinkedIn-style users (realistic & professional) ---
  {
    quote: "During my last job hunt, I used spreadsheets and notes everywhere. A tool like JobZy could replace all of that chaos.",
    name: "Amit Sharma",
    title: "Senior Backend Engineer · LinkedIn"
  },
  {
    quote: "Resume versioning + application status in one platform is a big win. This is something I would actually use.",
    name: "Pooja Verma",
    title: "HR Executive · LinkedIn"
  },
  {
    quote: "Early-stage but very practical. Job seekers don’t need fancy features — they need clarity and reminders.",
    name: "Rahul Mehta",
    title: "Full Stack Developer · LinkedIn"
  },
  {
    quote: "I mentor freshers and this is one of the biggest problems they face. JobZy can simplify their entire job search process.",
    name: "Sneha Kulkarni",
    title: "Career Coach · LinkedIn"
  }
];



    // Split testimonials to avoid duplicates in two rows
    const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
    const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

    return (
        <section className={`relative py-20 px-6 transition-colors overflow-hidden ${theme === 'dark'
            ? 'bg-black'
            : 'bg-[#FFFBF0]'
            }`}>
            <div className="mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-10">
                    <p className={`text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                        Trusted by ambitious students & developers
                    </p>
                </div>

                <div className="h-[32rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                    <InfiniteMovingCards
                        items={firstRow}
                        direction="left"
                        speed="slow"
                    />
                    <div className="h-2 md:h-4"></div>
                    <InfiniteMovingCards
                        items={secondRow}
                        direction="right"
                        speed="slow"
                    />
                </div>
            </div>

            {/* Side Fade Gradients */}
            <div className={`absolute left-0 top-0 bottom- w-20 z-20 bg-gradient-to-r ${theme === 'dark' ? 'from-black to-transparent' : 'from-[#FFFBF0] to-transparent'
                }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l ${theme === 'dark' ? 'from-black to-transparent' : 'from-[#FFFBF0] to-transparent'
                }`} />
        </section>
    )
}
