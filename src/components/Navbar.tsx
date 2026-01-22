"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import {
  ChevronDown,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Code,
  Users,
  Building2,
  FileText,
  Calendar,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react"

const megaMenuData = {
  solutions: {
    sections: [
      {
        title: "BY FEATURE",
        items: [
          { icon: FileText, name: "Job Tracking", desc: "Track all your applications in one place" },
          { icon: Calendar, name: "Interview Management", desc: "Never miss an interview again" },
          { icon: TrendingUp, name: "Status Updates", desc: "Monitor your application progress" },
        ]
      },
      {
        title: "BY USER",
        items: [
          { icon: GraduationCap, name: "Students", desc: "Perfect for campus placements" },
          { icon: Code, name: "Developers", desc: "Built by developers, for developers" },
          { icon: Briefcase, name: "Fresh Graduates", desc: "Start your career organized" },
        ]
      },
      {
        title: "JOBZY FOR",
        items: [
          { icon: Target, name: "High Volume Applicants", desc: "Applied to 100+ jobs?" },
          { icon: Zap, name: "Active Job Seekers", desc: "Stay on top of every opportunity" },
        ]
      }
    ]
  },
  resources: {
    sections: [
      {
        title: "LEARN",
        items: [
          { icon: FileText, name: "Blog", desc: "Job search tips and guides" },
          { icon: Sparkles, name: "Success Stories", desc: "Real stories from users" },
        ]
      },
      {
        title: "SUPPORT",
        items: [
          { icon: Users, name: "Help Center", desc: "Get answers to your questions" },
          { icon: Building2, name: "Contact Us", desc: "We're here to help" },
        ]
      }
    ]
  }
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <nav className={`w-full max-w-4xl rounded-2xl border backdrop-blur-3xl saturate-150 contrast-125 transition-all duration-300 ${theme === 'dark'
        ? 'bg-neutral-900/50 border-neutral-500/20'
        : 'bg-neutral-200/70 border-neutral-500/20'
        }`}>
        <div className="px-6 h-14 flex items-center justify-between">

          {/* Logo + Menu Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="JobZy Logo" width={60} height={60} className="h-9 w-9" />
              <span className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>JobZy</span>
            </a>

            {/* Desktop Menu - Next to Logo */}
            <div className="hidden md:flex items-center gap-6">

              {/* Solutions Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:scale-105 duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === "solutions" && (
                    <MegaMenu sections={megaMenuData.solutions.sections} />
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:scale-105 duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === "resources" && (
                    <MegaMenu sections={megaMenuData.resources.sections} />
                  )}
                </AnimatePresence>
              </div>

              <div className={`w-px h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

              <a href="#pricing" className={`text-sm font-medium transition-colors hover:scale-105 duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                Pricing
              </a>

              <a href="#about" className={`text-sm font-medium transition-colors hover:scale-105 duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                About
              </a>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className={`hidden sm:block text-sm font-medium transition-colors hover:scale-105 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
              Log in
            </a>

            <a href="https://tr.ee/lZYoG2GxNR" target="_blank" rel="noopener noreferrer"
              className={`hidden sm:flex items-center px-6 py-2 rounded-full text-sm font-normal backdrop-blur-xl saturate-200 contrast-150 transition-all duration-300 border-2
               ${theme === 'dark'
                  ? 'bg-neutral-900/90 text-white border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.7)]'
                  : 'bg-white/90 text-neutral-900 border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]'
                }`}>
              Get Early Access <ChevronRight className="ml-1 h-4 w-4" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all hover:scale-110 ${theme === 'dark'
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-black'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>


            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, margin: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, margin: 0 }}
              className={`md:hidden overflow-hidden rounded-3xl border ${theme === 'dark'
                ? 'bg-black/90 border-white/10 backdrop-blur-xl'
                : 'bg-white/95 border-black/5 backdrop-blur-xl'
                }`}
            >
              <div className="p-4 space-y-2">
                <a href="#solutions" className={`block px-4 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black'}`}>
                  Solutions
                </a>
                <a href="#resources" className={`block px-4 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black'}`}>
                  Resources
                </a>
                <a href="#pricing" className={`block px-4 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black'}`}>
                  Pricing
                </a>
                <a href="#about" className={`block px-4 py-3 rounded-xl transition-colors ${theme === 'dark' ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-black/5 hover:text-black'}`}>
                  About
                </a>
                <div className="pt-2">
                  <Button variant="ghost" className="w-full justify-start pl-4" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </Button>
                  <a
                    href="https://tr.ee/lZYoG2GxNR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full mt-2 flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 border-2
                      ${theme === 'dark'
                        ? 'bg-neutral-900/90 text-white border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.7)]'
                        : 'bg-white/90 text-neutral-900 border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Early Access <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

// Mega Menu Component
function MegaMenu({ sections }: { sections: any[] }) {
  const { theme } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full pt-6"
    >
      <div className={`rounded-2xl border backdrop-blur-xl p-6 shadow-2xl min-w-[700px] transition-colors ${theme === 'dark'
        ? 'border-gray-800 bg-gray-950/95'
        : 'border-violet-200 bg-white/95'
        }`}>
        <div className="grid grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className={`mb-4 text-xs font-semibold tracking-wider ${theme === 'dark' ? 'text-gray-500' : 'text-violet-500'
                }`}>
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item: any, itemIdx: number) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={itemIdx}
                      href="#"
                      className={`group flex items-start gap-3 rounded-lg p-3 transition-colors ${theme === 'dark' ? 'hover:bg-violet-500/20' : 'hover:bg-violet-100'
                        }`}
                      onClick={(e) => {
                        e.preventDefault()
                        console.log(`Clicked: ${item.name}`)
                      }}
                    >
                      <div className={`rounded-md p-2 transition-colors ${theme === 'dark' ? 'bg-violet-500/20 group-hover:bg-violet-500/30' : 'bg-violet-100 group-hover:bg-violet-200'
                        }`}>
                        <Icon className={`h-4 w-4 ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`} />
                      </div>
                      <div>
                        <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                          {item.name}
                        </div>
                        <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
