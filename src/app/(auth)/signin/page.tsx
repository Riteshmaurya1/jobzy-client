"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, ArrowRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await signIn({ email, password });
        } catch (err: any) {
            toast({
                title: "Sign in failed",
                description: err instanceof Error ? err.message : "An unexpected error occurred",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white relative overflow-hidden">

            {/* Background Animation Layer (Visible on Mobile & Desktop) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                {/* Animated Orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-200/40 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            {/* Content Container */}
            <div className="flex w-full h-screen relative z-10">

                {/* Left Side - Brand (Desktop Only) */}
                <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <Image src="/logo.png" alt="JobZy Logo" width={40} height={40} className="object-contain" />
                        <span className="font-display font-bold text-2xl text-slate-900">JobZy</span>
                    </Link>

                    {/* Main Content */}
                    <div className="max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="font-display text-5xl font-bold text-slate-900 leading-[1.15] mb-6">
                                Master your <br />
                                <span className="text-violet-600">career journey.</span>
                            </h1>
                            <p className="font-body text-lg text-slate-600 leading-relaxed mb-8">
                                Join thousands of professionals who use JobZy to track applications, ace interviews, and land their dream offers.
                            </p>

                            <div className="space-y-4">
                                {['Smart application tracking', 'Interview scheduling & reminders', 'Analytics & insights'].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-violet-600" />
                                        </div>
                                        <span className="font-body text-slate-700 font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="font-body text-sm text-slate-400">
                        © {new Date().getFullYear()} JobZy Inc.
                    </div>
                </div>

                {/* Right Side - Form (Center on Mobile, Right on Desktop) */}
                <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-24 w-full">

                    {/* Mobile Header (Visible Only on Mobile) */}
                    <div className="lg:hidden w-full max-w-[400px] mb-8 flex flex-col items-center text-center">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Image src="/logo.png" alt="JobZy Logo" width={32} height={32} className="object-contain" />
                            <span className="font-display font-bold text-xl text-slate-900">JobZy</span>
                        </Link>
                        <h1 className="font-display text-3xl font-bold text-slate-900 leading-tight mb-2">
                            Welcome Back
                        </h1>
                        <p className="font-body text-slate-500 text-sm">
                            Manage your job search with ease.
                        </p>
                    </div>


                    <div className="w-full max-w-[400px] bg-white/60 backdrop-blur-md rounded-3xl p-6 lg:p-0 lg:bg-transparent lg:shadow-none shadow-xl shadow-violet-100/50 border border-white/50 lg:border-none">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden lg:block mb-8"
                        >
                            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                            <p className="font-body text-slate-500">Please enter your details to sign in.</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-5">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <label className="block font-body text-sm font-medium text-slate-700 mb-1.5 pl-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="font-body block w-full pl-11 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <label className="block font-body text-sm font-medium text-slate-700 mb-1.5 pl-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="font-body block w-full pl-4 pr-11 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="flex items-center justify-between"
                            >
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 transition-all"
                                        />
                                    </div>
                                    <span className="ml-2 font-body text-sm text-slate-600">Remember me</span>
                                </label>
                                <Link href="#" className="font-body text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                    Forgot password?
                                </Link>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-violet-500/20 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="text-center font-body text-sm text-slate-500"
                            >
                                Don't have an account?{" "}
                                <Link href="/signup" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                                    Create an account
                                </Link>
                            </motion.p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
