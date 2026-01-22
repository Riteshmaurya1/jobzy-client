"use client"

import { Instagram, Car } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
    const { theme } = useTheme()
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "How It Works", href: "#how-it-works" },
            { name: "Pricing", href: "#pricing" },
        ],
        resources: [
            { name: "Blog", href: "#" },
            { name: "Community", href: "#" },
            { name: "Help Center", href: "#" },
        ],
        company: [
            { name: "About", href: "#about" },
            { name: "Privacy Policy", href: "#privacy" },
            { name: "Terms", href: "#terms" },
        ]
    }

    return (
        <footer className={`relative pt-24 pb-0 overflow-hidden font-sans transition-colors duration-300
            ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#FFFBF0] text-gray-900'}
        `}>
            <div className="mx-auto max-w-7xl px-6 relative z-10">

                {/* TOP SECTION: Info & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                    {/* Left: Brand Statement */}
                    <div className="lg:col-span-5 pr-8">
                        {/* Branded Logo Box */}
                        <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl mb-6 border-2 transition-all
                             ${theme === 'dark'
                                ? 'border-violet-400 bg-violet-500/10 shadow-[0_0_20px_-3px_rgba(139,92,246,0.6)]'
                                : 'border-orange-300 bg-orange-50 shadow-md'
                            }
                        `}>
                            <Image src="/logo.png" alt="JobZy Logo" width={32} height={32} className="h-8 w-8" />
                            <span className="font-bold tracking-tight">JobZy</span>
                        </div>

                        <p className={`text-xl sm:text-2xl font-medium leading-relaxed
                            ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}
                        `}>
                            JobZy is the most complete job search AI suite for ambitious developers, trusted by students and employed engineers worldwide.
                        </p>
                    </div>

                    {/* Right: Links Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {[
                            { title: "Product", items: footerLinks.product },
                            { title: "Resources", items: footerLinks.resources },
                            { title: "Company", items: footerLinks.company }
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h4 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.items.map((link, i) => (
                                        <li key={i}>
                                            <a href={link.href} className={`transition-colors
                                                ${theme === 'dark' ? 'text-neutral-500 hover:text-white' : 'text-gray-500 hover:text-violet-600'}
                                            `}>
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* BOTTOM: SVG MASKED TEXT WITH DASHED STROKE */}
            <div className="relative w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 1300 350" className="w-full h-auto block" preserveAspectRatio="xMidYMax slice">
                    <defs>
                        <mask id="text-mask" x="0" y="0" width="100%" height="100%">
                            <rect x="0" y="0" width="100%" height="100%" fill="black" />
                            <text x="50%" y="85%" textAnchor="middle" fontSize="300" fontWeight="bold" fontFamily="sans-serif" fill="white">
                                JobZy
                            </text>
                        </mask>
                    </defs>

                    <rect x="0" y="0" width="100%" height="100%" fill={theme === 'dark' ? '#111' : '#F3F0FF'} mask="url(#text-mask)" />

                    <text
                        x="50%"
                        y="85%"
                        textAnchor="middle"
                        fontSize="300"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        fill="none"
                        stroke={theme === 'dark' ? '#333' : '#DDD6FE'}
                        strokeWidth="2"
                        strokeDasharray="12 12"
                    >
                        JobZy
                    </text>

                    <g mask="url(#text-mask)">
                        <foreignObject x="0" y="0" width="100%" height="100%">
                            <div className="w-full h-full relative">
                                <motion.div
                                    className="absolute top-[60%] left-0 w-full h-24"
                                    initial={{ x: "-10%" }}
                                    animate={{ x: "110%" }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <Car className={`w-24 h-24 ${theme === 'dark' ? 'text-violet-600 fill-violet-600' : 'text-violet-500 fill-violet-500'}`} />
                                </motion.div>
                            </div>
                        </foreignObject>
                    </g>
                </svg>

                {/* Copyright & Instagram - Bottom Bar */}
                <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 flex items-end justify-between z-20">
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-600' : 'text-gray-400'}`}>
                        © {currentYear} JobZy
                    </div>

                    <a
                        href="https://www.instagram.com/jobzy.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm transition-transform hover:scale-105
                            ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/50 text-gray-900 border border-gray-200 hover:bg-white'}
                        `}
                    >
                        <Instagram className="w-5 h-5" />
                        <span className="font-semibold text-sm">Follow us</span>
                    </a>
                </div>
            </div>

        </footer>
    )
}
