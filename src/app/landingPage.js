"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Clock,
  Award,
  MessageSquare,
  BarChart3,
  Star,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { LampContainer } from "@/components/ui/lamp";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Enhanced features with icons
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI-Powered Job Matching",
      description:
        "Our intelligent algorithm analyzes your skills, experience, and preferences to connect you with the perfect opportunities.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Applications",
      description:
        "Apply to multiple positions instantly with your pre-filled profile. Save hours of repetitive form filling.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description:
        "Track your applications, view response rates, and get insights into market trends and salary expectations.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Direct Recruiter Chat",
      description:
        "Connect instantly with hiring managers and recruiters. Skip the waiting game and get responses faster.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. Control who sees your profile and manage your privacy settings easily.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Career Development",
      description:
        "Access exclusive courses, mentorship programs, and resources to level up your skills and boost your career.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        "Jobzy completely transformed my job search. I landed my dream role at Google within 2 weeks of signing up. The AI matching is incredibly accurate!",
      name: "Sarah Chen",
      title: "Software Engineer at Google",
    },
    {
      quote:
        "The one-click apply feature saved me countless hours. I got 5 interview calls in my first month. Best investment I've made in my career.",
      name: "Michael Rodriguez",
      title: "Product Manager at Microsoft",
    },
    {
      quote:
        "I negotiated a 40% salary increase using the insights from Jobzy's analytics. The platform pays for itself many times over.",
      name: "Priya Sharma",
      title: "Data Scientist at Amazon",
    },
    {
      quote:
        "As a recruiter, I love how Jobzy connects me with qualified candidates. The direct messaging feature is a game-changer.",
      name: "James Wilson",
      title: "Senior Recruiter at Apple",
    },
  ];

  // Integration logos (placeholder data)
  const integrations = [
    { name: "LinkedIn", logo: "💼" },
    { name: "Indeed", logo: "🎯" },
    { name: "Glassdoor", logo: "🏢" },
    { name: "AngelList", logo: "👼" },
    { name: "GitHub", logo: "🐙" },
    { name: "Stack Overflow", logo: "📚" },
  ];

  // Stats
  const stats = [
    { value: "500K+", label: "Active Job Seekers" },
    { value: "50K+", label: "Job Openings Daily" },
    { value: "98%", label: "Success Rate" },
    { value: "2 Weeks", label: "Avg. Time to Hire" },
  ];

  // Pricing plans
  const pricing = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for getting started",
      features: [
        "Access to 50K+ job listings",
        "Apply to 10 jobs/month",
        "Basic profile creation",
        "Email notifications",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "₹99",
      period: "/month",
      description: "Best for active job seekers",
      features: [
        "Everything in Starter",
        "Unlimited applications",
        "AI-powered job matching",
        "Featured profile boost",
        "Advanced filters & search",
        "Priority support",
        "Resume builder & templates",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "₹299",
      period: "/month",
      description: "For serious professionals",
      features: [
        "Everything in Professional",
        "Personal career coach",
        "Exclusive job opportunities",
        "Interview preparation",
        "Salary negotiation help",
        "Personal branding suite",
        "Direct recruiter access",
      ],
      cta: "Get Started",
      highlighted: false,
    },
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-50 overflow-hidden">
      {/* Modern Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/30 backdrop-blur-xl bg-slate-950/90"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
                J
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Jobzy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <a
                href="#features"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                Testimonials
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-slate-800/30 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-2">
              {["Features", "How It Works", "Pricing", "Testimonials"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <Spotlight className="top-20 left-0" fill="rgba(168, 85, 247, 0.4)" />
        <Spotlight
          className="top-40 right-0"
          fill="rgba(34, 211, 238, 0.4)"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Job Matching Platform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            >
              <span className="block text-white mb-2">
                Find Your Dream Job
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                In Record Time
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Join 500,000+ professionals using AI to discover perfect job matches.
              Apply faster, get noticed quicker, and land your dream role.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
                >
                  Start For Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border-2 border-slate-700 text-white font-semibold hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto pt-12 border-t border-slate-800/50"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to accelerate your job search and career growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Integration Section */}
      <section className="py-16 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Integrations
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">
              Connects with platforms you already use
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center"
          >
            {integrations.map((integration, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="text-4xl md:text-5xl grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110">
                  {integration.logo}
                </div>
                <span className="text-xs text-slate-600 group-hover:text-slate-400 transition-colors">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Build a comprehensive profile in minutes. Add your skills, experience, and career preferences",
                icon: <Users className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Get AI Matches",
                description:
                  "Our AI analyzes thousands of opportunities and matches you with the best fits based on your profile",
                icon: <Target className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Apply & Get Hired",
                description:
                  "One-click applications, direct messaging with recruiters, and real-time tracking of your progress",
                icon: <TrendingUp className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="relative p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center font-bold text-white shadow-lg">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 mt-4">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connector line for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Choose the perfect plan for your job search journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                  ? "border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 shadow-xl shadow-purple-500/10"
                  : "border-slate-800/50 bg-slate-900/30 hover:border-slate-700"
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-500 text-lg">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup">
                  <button
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${plan.highlighted
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105"
                      : "border-2 border-slate-700 text-white hover:bg-slate-800/50 hover:border-slate-600"
                      }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Loved by Job Seekers Worldwide
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join thousands who transformed their careers with Jobzy
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials.map((t) => ({
                quote: t.quote,
                name: t.name,
                title: t.title,
              }))}
              speed="slow"
              direction="right"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 blur-3xl" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Ready to Find Your Dream Job?
                </span>
              </h2>

              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 500,000+ professionals who are discovering better opportunities every day.
                Start your journey today—completely free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Get Started for Free
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border-2 border-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Schedule a Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                  J
                </div>
                <span className="text-xl font-bold text-white">Jobzy</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your AI-powered partner in finding the perfect career opportunity. 
                Join 500K+ professionals already on their journey.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { name: "Twitter", icon: "🐦", url: "#" },
                  { name: "LinkedIn", icon: "💼", url: "#" },
                  { name: "Instagram", icon: "📸", url: "#" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "How It Works", href: "#how-it-works" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Testimonials", href: "#testimonials" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Contact", href: "#" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Cookie Policy", href: "#" },
                  { name: "Security", href: "#" },
                ],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Jobzy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
