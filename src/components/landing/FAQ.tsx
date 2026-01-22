"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const faqs = [
    {
        question: "What exactly is JobZy?",
        answer: "JobZy is your all-in-one job search copilot. We help students and developers track applications, manage interviews, organize research notes, and automate follow-ups—all in one distraction-free dashboard."
    },
    {
        question: "Can I try it for free?",
        answer: "Yes! Our Free plan lets you track up to 20 applications/month, manage 30 interviews, and use basic analytics forever. No credit card required to get started."
    },
    {
        question: "How does the AI Resume Builder work?",
        answer: "Our AI analyzes your profile and target job description to build a tailored, ATS-friendly resume in seconds. It highlights relevant skills and keywords to increase your chances of getting shortlisted."
    },
    {
        question: "What is the ATS Score Checker?",
        answer: "The ATS Checker scans your resume against a specific job description to predict how well you match. It gives you a score out of 100 and suggests missing keywords to improve your ranking."
    },
    {
        question: "Is my data safe?",
        answer: "Absolutely. Your data is encrypted and stored securely. We never sell your personal information to recruiters or third parties. Your job search is private."
    },
    {
        question: "Do you offer student discounts?",
        answer: "Our Premium plan is priced at just ₹99/month specifically to be affordable for students in India. We believe career tools should be accessible to everyone."
    },
    {
        question: "Can I upgrade my plan later?",
        answer: "Yes, you can easily upgrade to Premium or Pro at any time from your dashboard. Your new limits and features will be unlocked immediately."
    }
]

export function FAQ() {
    const { theme } = useTheme()
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className={`py-24 px-6 transition-colors ${theme === "dark" ? "bg-black" : "bg-[#FFFBF0]"}`}>
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-3xl sm:text-4xl font-bold font-display mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Frequently Asked Questions
                    </h2>
                    <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Everything you need to know about JobZy.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden
                                ${theme === "dark"
                                    ? "bg-neutral-900 border-neutral-800"
                                    : "bg-white border-violet-100 hover:border-violet-200 hover:shadow-sm"
                                }
                            `}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`text-lg font-semibold font-display pr-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 transition-colors ${theme === "dark" ? "text-gray-400" : "text-violet-500"}`}>
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className={`px-6 pb-6 text-base leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default FAQ
