"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, Phone, Briefcase, Target, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { div } from "framer-motion/client";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        currentGoal: "",
        primaryRole: ""
    });
    const { signUp, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await signUp({
                ...formData,
                phoneNumber: Number(formData.phoneNumber.replace(/[^0-9]/g, ''))
            });
        } catch (err: any) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white relative overflow-hidden">
            {/* Background Animation Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            {/* Content Container */}
            <div className="flex w-full h-screen relative z-10">

                {/* Left Side - Brand (Desktop Only) */}
                <div className="hidden lg:flex w-1/2= flex-col justify-between p-12 xl:p-16 sticky top-0 h-screen">
                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-3">
                        <Image src="/logo.png" alt="JobZy Logo" width={36} height={36} className="object-contain" />
                        <span className="font-display font-bold text-2xl text-slate-900">JobZy</span>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="font-display text-4xl xl:text-5xl font-bold text-slate-900 leading-[1.15] mb-4 xl:mb-6">
                                Start your <br />
                                <span className="text-orange-500">success story.</span>
                            </h1>
                            <p className="font-body text-base xl:text-lg text-slate-600 leading-relaxed mb-6 xl:mb-8">
                                One workspace for all your applications, interviews, and follow-ups. Stop juggling spreadsheets.
                            </p>

                            <div className="grid grid-cols-2 gap-3 xl:gap-4">
                                <FeatureCard icon={<Sparkles className="w-5 h-5 text-orange-500" />} title="AI-Powered" desc="Smart resume matching" delay={0.2} />
                                <FeatureCard icon={<Target className="w-5 h-5 text-violet-600" />} title="Goal Tracking" desc="Stay focused on targets" delay={0.3} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Copyright */}
                    <div className="relative z-10 font-body text-xs text-slate-400">
                        © {new Date().getFullYear()} JobZy Inc.
                    </div>
                </div>

                {/* Right Side - Form (Compact Layout) */}
                <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-16 w-full h-full overflow-hidden">

                    {/* Mobile Header (Compact) */}
                    <div className="lg:hidden w-full max-w-[360px] mb-4 flex flex-col items-center text-center shrink-0">
                        <Link href="/" className="flex items-center gap-2 mb-2">
                            <Image src="/logo.png" alt="JobZy Logo" width={28} height={28} className="object-contain" />
                            <span className="font-display font-bold text-lg text-slate-900">JobZy</span>
                        </Link>
                        <h1 className="font-display text-2xl font-bold text-slate-900 leading-tight">
                            Create Account
                        </h1>
                    </div>

                    <div className="w-full max-w-[420px] bg-white/60 backdrop-blur-md rounded-2xl p-5 lg:p-0 lg:bg-transparent lg:shadow-none shadow-lg shadow-orange-100/50 border border-white/50 lg:border-none flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="hidden lg:block mb-6"
                        >
                            <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">Create Account</h2>
                            <p className="font-body text-sm text-slate-500">Get started with your free account today.</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs flex items-center gap-2 font-body"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <InputField
                                    id="name"
                                    type="text"
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={<User className="h-4 w-4" />}
                                    delay={0.1}
                                />
                                <InputField
                                    id="email"
                                    type="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={<Mail className="h-4 w-4" />}
                                    delay={0.15}
                                />
                            </div>

                            <InputField
                                id="phoneNumber"
                                type="tel"
                                label="Phone Number"
                                minLength={10}
                                maxLength={10}
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                icon={<Phone className="h-4 w-4" />}
                                delay={0.2}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <PasswordField
                                    id="password"
                                    label="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    showPassword={showPassword}
                                    toggleShow={() => setShowPassword(!showPassword)}
                                    delay={0.25}
                                />
                                <PasswordField
                                    id="confirmPassword"
                                    label="Confirm"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    showPassword={showPassword}
                                    toggleShow={() => setShowPassword(!showPassword)}
                                    delay={0.3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <InputField
                                    id="primaryRole"
                                    type="text"
                                    label="Role"
                                    value={formData.primaryRole}
                                    onChange={handleChange}
                                    icon={<Briefcase className="h-4 w-4" />}
                                    delay={0.35}
                                />
                                <InputField
                                    id="currentGoal"
                                    type="text"
                                    label="Goal"
                                    value={formData.currentGoal}
                                    onChange={handleChange}
                                    icon={<Target className="h-4 w-4" />}
                                    delay={0.4}
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45, duration: 0.4 }}
                                className="flex items-start space-x-2 pt-5"
                            >
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label htmlFor="terms" className="font-body text-xs text-slate-500 leading-tight">
                                    I agree to the <Link href="#" className="font-medium text-violet-600 hover:text-violet-700">Terms</Link> & <Link href="#" className="font-medium text-violet-600 hover:text-violet-700">Privacy</Link>.
                                </label>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md shadow-violet-500/10 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="text-center font-body text-xs text-slate-500"
                            >
                                Already have an account?{" "}
                                <Link href="/signin" className="font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                                    Sign in
                                </Link>
                            </motion.p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="p-3 xl:p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
        >
            <div className="mb-2 p-1.5 w-fit rounded-lg bg-slate-50">
                {icon}
            </div>
            <h3 className="font-display font-semibold text-slate-900 mb-0.5 text-sm xl:text-base">{title}</h3>
            <p className="font-body text-[10px] xl:text-xs text-slate-500">{desc}</p>
        </motion.div>
    );
}

function InputField({ id, type, label, value, onChange, icon, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <label className="block font-body text-xs font-medium text-slate-700 mb-1 pl-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {icon}
                </div>
                <input
                    id={id}
                    type={type}
                    required
                    value={value}
                    onChange={onChange}
                    className="font-body block w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                />
            </div>
        </motion.div>
    );
}

function PasswordField({ id, label, value, onChange, showPassword, toggleShow, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <label className="block font-body text-xs font-medium text-slate-700 mb-1 pl-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                </div>
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    required
                    value={value}
                    onChange={onChange}
                    className="font-body block w-full pl-9 pr-9 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 shadow-sm"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </motion.div>
    );
}
