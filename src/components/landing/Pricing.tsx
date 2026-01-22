"use client"

import { motion } from "framer-motion"
import { Check, X, ChevronRight, Rocket, Zap, Crown, Sparkles, Lock } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const tiers = [
    {
        name: "Free",
        tagline: "Free forever",
        price: "0",
        period: "per user/month",
        icon: Rocket,
        gradient: "from-gray-400 to-gray-600",
        features: [
            { name: "20 Job Applications / mo", included: true },
            { name: "30 Interviews / mo", included: true },
            { name: "50 Notes", included: true },
            { name: "30 Emails / mo", included: true },
            { name: "Basic Analytics", included: true },
            { name: "1 ATS Check / mo", included: true },
            { name: "AI Resume Builder", included: false },
            { name: "Advanced Analytics", included: false },
            { name: "PDF/CSV Export", included: false },
        ],
        cta: "Start for free",
        variant: "outline",
        popular: false,
    },
    {
        name: "Premium",
        tagline: "For serious job seekers",
        price: "99",
        period: "per user/month",
        icon: Zap,
        gradient: "from-violet-500 to-purple-600",
        features: [
            { name: "150 Job Applications / mo", included: true },
            { name: "500 Interviews / mo", included: true },
            { name: "200 Notes", included: true },
            { name: "600 Emails / mo", included: true },
            { name: "Advanced Analytics", included: true },
            { name: "15 AI Resume Gens / mo", included: true },
            { name: "20 ATS Checks / mo", included: true },
            { name: "PDF/CSV Export", included: true },
            { name: "ATS Keyword Suggestions", included: false },
        ],
        cta: "Upgrade to Premium",
        variant: "filled",
        popular: false,
    },
    {
        name: "Pro",
        tagline: "Power users & coaches",
        price: "199",
        period: "per user/month",
        icon: Crown,
        gradient: "from-orange-500 to-amber-500",
        features: [
            { name: "500 Job Applications / mo", included: true },
            { name: "2000 Interviews / mo", included: true },
            { name: "1000 Notes", included: true },
            { name: "3000 Emails / mo", included: true },
            { name: "Advanced Analytics + Insights", included: true },
            { name: "50 AI Resume Gens / mo", included: true },
            { name: "75 ATS Checks / mo", included: true },
            { name: "Resume-JD Matcher", included: true },
            { name: "ATS Keyword Suggestions", included: true },
            { name: "PDF/CSV Export", included: true },
            { name: "Priority Support 24/7", included: true },
        ],
        cta: "Go Pro",
        variant: "filled",
        popular: true,
    },
]

export function Pricing() {
    const { theme } = useTheme()

    return (
        <section id="pricing" className={`py-24 px-6 transition-colors overflow-hidden ${theme === "dark" ? "bg-black" : "bg-[#FFFBF0]"}`}>
            <div className="mx-auto max-w-7xl relative">

                {/* Background Blurs */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full blur-3xl -z-10 opacity-20 ${theme === 'dark' ? 'bg-violet-900/30' : 'bg-violet-200/50'}`} />

                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${theme === "dark" ? "bg-neutral-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600 shadow-sm"}`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Pricing
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`text-4xl sm:text-5xl font-extrabold font-display leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                        Start for free and upgrade to<br className="hidden sm:block" /> unlock more features
                    </motion.h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`flex flex-col p-8 rounded-[2rem] border transition-all duration-300 relative group
                                ${theme === "dark"
                                    ? "bg-neutral-900 border-zinc-800 hover:border-zinc-700 shadow-2xl shadow-black/50"
                                    : "bg-white border-gray-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10"
                                }
                            `}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <span className={`px-4 py-1 rounded-full text-xs font-medium tracking-wide shadow-lg
                                        ${theme === "dark" ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" : "bg-gradient-to-r from-violet-600 to-purple-600 text-white"}
                                    `}>
                                        ✨ Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Decorative Background Glow for Popular */}
                            {tier.popular && (
                                <div className={`absolute inset-0 rounded-[2rem] opacity-10 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-amber-500' : 'bg-gradient-to-br from-violet-500 to-purple-500'}`} />
                            )}

                            {/* Inner Card with Header and Price */}
                            <div className={`relative z-10 p-4 rounded-2xl mb-6 border shadow-sm
                                ${theme === 'dark'
                                    ? 'bg-zinc-800/50 border-zinc-700'
                                    : 'bg-gray-50/50 border-gray-200'
                                }
                            `}>
                                {/* Icon and CTA Row */}
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} shadow-lg flex-shrink-0`}>
                                        <tier.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <a href="#pricing" target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-medium transition-all duration-300 border
                                        ${tier.variant === 'filled'
                                            ? (theme === 'dark'
                                                ? 'bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800'
                                                : 'bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50')
                                            : (theme === 'dark'
                                                ? 'bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50'
                                                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-white')
                                        }
                                    `}>
                                        {tier.cta} <ChevronRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                {/* Title and Tagline */}
                                <h3 className={`text-xl font-bold font-display ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {tier.name}
                                </h3>
                                <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                    {tier.tagline}
                                </p>
                                {tier.name === 'Free' && (
                                    <p className="text-xs text-gray-400 mt-2">No Credit Card required</p>
                                )}

                                {/* Price & Razorpay Badge */}
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-600">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            ₹{tier.price}
                                        </span>
                                        <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                            /{tier.period.replace('per user/', '')}
                                        </span>
                                    </div>
                                    {/* Secured by Razorpay - Only for paid tiers */}
                                    {tier.name !== 'Free' && (
                                        <div className={`flex items-center gap-1.5 mt-3 text-[10px] font-medium
                                            ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}
                                        `}>
                                            <Lock className="w-3 h-3" />
                                            <span>Secured by</span>
                                            <span className={`font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Razorpay</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features Divider */}
                            <div className={`h-px w-full mb-8 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`} />

                            {/* Feature List */}
                            <div className="flex-grow">
                                <p className={`text-xs font-semibold uppercase mb-4 ${theme === "dark" ? "text-gray-500" : "text-gray-900"}`}>
                                    {tier.name === 'Free' ? 'Key features:' : `Everything in ${tier.name === 'Pro' ? 'Premium' : 'Free'}, plus:`}
                                </p>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 group/item">
                                            {feature.included ? (
                                                <div className={`mt-0.5 min-w-4 w-4 h-4 rounded-full flex items-center justify-center border transition-colors
                                                    ${theme === "dark"
                                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover/item:bg-emerald-500/20"
                                                        : "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover/item:bg-emerald-100"}
                                                `}>
                                                    <Check className="w-2.5 h-2.5" />
                                                </div>
                                            ) : (
                                                <div className={`mt-0.5 min-w-4 w-4 h-4 rounded-full flex items-center justify-center border transition-colors
                                                    ${theme === "dark" ? "bg-zinc-800/50 border-zinc-800 text-zinc-600" : "bg-gray-50 border-gray-100 text-gray-300"}
                                                `}>
                                                    <X className="w-2.5 h-2.5" />
                                                </div>
                                            )}
                                            <span className={`text-sm leading-tight transition-colors ${feature.included
                                                ? (theme === "dark" ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900")
                                                : (theme === "dark" ? "text-zinc-600" : "text-gray-400")
                                                }`}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing
