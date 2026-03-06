"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import { motion, Variants } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "@/contexts/ThemeContext"
import { paymentsService, Subscription, Payment } from "@/services/paymentsService"
import { quotaService } from "@/services/quotaService"
import { Quota } from "@/services/interviewsService"
import { QuotaUsage } from "@/components/dashboard/QuotaUsage"
import {
    CreditCard, Crown, Zap, Check, X, Loader2, Receipt,
    CalendarDays, Shield, Clock, ChevronRight,
    Rocket, Lock, Timer, Sparkles
} from "lucide-react"
import { format, differenceInDays } from "date-fns"

declare global {
    interface Window {
        Razorpay: any;
    }
}

const tiers = [
    {
        id: "free",
        name: "Free",
        tagline: "Free forever",
        price: "0",
        period: "month",
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
        cta: "Current Plan",
        variant: "outline" as const,
        popular: false,
    },
    {
        id: "premium",
        name: "Premium",
        tagline: "For serious job seekers",
        price: "99",
        period: "month",
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
        variant: "filled" as const,
        popular: false,
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "Power users & coaches",
        price: "199",
        period: "month",
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
        variant: "filled" as const,
        popular: true,
    },
]

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
}

export default function BillingPage() {
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [payments, setPayments] = useState<Payment[]>([])
    const [quotas, setQuotas] = useState<Quota[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [processingPlan, setProcessingPlan] = useState<string | null>(null)
    const [razorpayLoaded, setRazorpayLoaded] = useState(false)
    const { toast } = useToast()
    const { theme } = useTheme()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const [subRes, histRes, quotaData] = await Promise.all([
                paymentsService.getSubscription(),
                paymentsService.getHistory(),
                quotaService.getAllQuotas(),
            ])
            if (subRes.success) setSubscription(subRes.subscription)
            if (histRes.success) setPayments(histRes.payments || [])
            setQuotas(quotaData)
        } catch (error) {
            console.error("Failed to fetch billing data:", error)
            toast({ title: "Error", description: "Failed to load billing data", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpgrade = async (planId: string) => {
        if (!razorpayLoaded && !window.Razorpay) {
            toast({ title: "Loading", description: "Payment system is loading, please try again.", variant: "destructive" })
            return
        }
        setProcessingPlan(planId)
        try {
            const orderRes = await paymentsService.createOrder(planId, "monthly")
            if (!orderRes.success) {
                toast({ title: "Error", description: orderRes.message || "Failed to create order", variant: "destructive" })
                setProcessingPlan(null)
                return
            }

            const options = {
                key: orderRes.razorpayKeyId || orderRes.key_id,
                amount: orderRes.order.amount,
                currency: orderRes.order.currency || "INR",
                name: "JobZy",
                description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan - Monthly`,
                order_id: orderRes.order.id,
                handler: async (response: any) => {
                    try {
                        console.log("Razorpay response:", response)
                        const verifyRes = await paymentsService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                        console.log("Verify response:", verifyRes)
                        if (verifyRes.success) {
                            toast({ title: "Payment Successful! 🎉", description: "Your plan has been upgraded." })
                            fetchData()
                        } else {
                            toast({ title: "Verification Failed", description: verifyRes.message || "Payment could not be verified", variant: "destructive" })
                        }
                    } catch (err) {
                        console.error("Verification error:", err)
                        toast({ title: "Error", description: "Payment verification failed", variant: "destructive" })
                    }
                    setProcessingPlan(null)
                },
                modal: { ondismiss: () => setProcessingPlan(null) },
                theme: { color: "#7C3AED" }
            }

            const rzp = new window.Razorpay(options)
            rzp.on("payment.failed", async (response: any) => {
                try {
                    await paymentsService.reportFailure({
                        razorpay_order_id: response.error?.metadata?.order_id || orderRes.order.id,
                        error_code: response.error?.code || "UNKNOWN",
                        error_description: response.error?.description || "Payment failed",
                    })
                } catch { /* silent */ }
                toast({ title: "Payment Failed", description: response.error?.description || "Something went wrong", variant: "destructive" })
                setProcessingPlan(null)
            })
            rzp.open()
        } catch (error) {
            console.error("Upgrade error:", error)
            toast({ title: "Error", description: "Failed to initiate payment", variant: "destructive" })
            setProcessingPlan(null)
        }
    }

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            captured: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
            active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
            expired: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
            cancelled: "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700",
            paid: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
            failed: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
            created: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
            pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
            free: "bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700",
        }
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                </div>
            </DashboardLayout>
        )
    }

    const currentPlan = subscription?.planType || "free"
    const currentTier = tiers.find(t => t.id === currentPlan) || tiers[0]
    const availableTiers = tiers.filter(t => t.id !== currentPlan)

    // Days remaining progress
    const totalDays = subscription?.validFrom && subscription?.validUntil
        ? differenceInDays(new Date(subscription.validUntil), new Date(subscription.validFrom))
        : 30
    const daysRemaining = subscription?.daysRemaining ?? 0
    const daysUsed = totalDays - daysRemaining
    const progressPercent = totalDays > 0 ? Math.min((daysUsed / totalDays) * 100, 100) : 0

    return (
        <DashboardLayout>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
                onLoad={() => setRazorpayLoaded(true)}
            />

            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Billing & Usage" }
            ]} />

            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-7xl mx-auto">

                {/* ===== CURRENT SUBSCRIPTION CARD ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`relative overflow-hidden rounded-[2rem] border transition-all
                        ${theme === "dark"
                            ? "bg-neutral-900 border-zinc-800"
                            : "bg-white border-gray-200 shadow-sm"
                        }`}
                >
                    {/* Background glow */}
                    <div className={`absolute inset-0 opacity-[0.07] bg-gradient-to-br ${currentTier.gradient}`} />

                    <div className="relative z-10 p-6 sm:p-8">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${currentTier.gradient} shadow-lg`}
                                >
                                    <currentTier.icon className="w-7 h-7 text-white" />
                                </motion.div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className={`text-2xl font-bold font-display ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {currentTier.name} Plan
                                        </h2>
                                        {getStatusBadge(subscription?.status || "free")}
                                    </div>
                                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {currentTier.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Price badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`flex items-baseline gap-1 px-5 py-2.5 rounded-2xl border
                                    ${theme === "dark"
                                        ? "bg-zinc-800/60 border-zinc-700"
                                        : "bg-gray-50 border-gray-200"
                                    }`}
                            >
                                <span className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    ₹{subscription ? (subscription.amount / 100).toLocaleString() : currentTier.price}
                                </span>
                                <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                    /{subscription?.planDuration === "yearly" ? "yr" : "mo"}
                                </span>
                            </motion.div>
                        </div>

                        {/* Validity & Days Remaining Section */}
                        {subscription && subscription.planType !== "free" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                            >
                                {/* Dates row */}
                                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 p-4 rounded-2xl border
                                    ${theme === "dark"
                                        ? "bg-zinc-800/40 border-zinc-700/50"
                                        : "bg-gray-50/80 border-gray-200/80"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-violet-950/40" : "bg-violet-50"}`}>
                                            <CalendarDays className={`h-4 w-4 ${theme === "dark" ? "text-violet-400" : "text-violet-600"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] uppercase tracking-wider font-semibold ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Valid From</p>
                                            <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                {format(new Date(subscription.validFrom), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-orange-950/40" : "bg-orange-50"}`}>
                                            <CalendarDays className={`h-4 w-4 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] uppercase tracking-wider font-semibold ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Valid Until</p>
                                            <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                {format(new Date(subscription.validUntil), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${theme === "dark" ? "bg-emerald-950/40" : "bg-emerald-50"}`}>
                                            <Timer className={`h-4 w-4 ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`} />
                                        </div>
                                        <div>
                                            <p className={`text-[10px] uppercase tracking-wider font-semibold ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>Days Remaining</p>
                                            <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                {daysRemaining} days
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            Subscription Progress
                                        </p>
                                        <p className={`text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            {daysUsed} of {totalDays} days used
                                        </p>
                                    </div>
                                    <div className={`h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercent}%` }}
                                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                            className={`h-full rounded-full bg-gradient-to-r ${currentTier.gradient}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}


                    </div>
                </motion.div>

                {/* ===== USAGE & QUOTAS ===== */}
                <QuotaUsage quotas={quotas} />

                {/* ===== PLAN SELECTION ===== */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <h3 className={`text-xl font-bold font-display ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {currentPlan === "free" ? "Upgrade Your Plan" : "Switch Plan"}
                        </h3>
                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {currentPlan === "free" ? "Unlock more features with a paid plan" : "Choose a different plan that suits your needs"}
                        </p>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className={`grid grid-cols-1 ${availableTiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
                        {availableTiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                whileHover={{ y: -8 }}
                                className={`flex flex-col p-6 sm:p-8 rounded-[2rem] border transition-all duration-300 relative group
                                    ${theme === "dark"
                                        ? "bg-neutral-900 border-zinc-800 hover:border-zinc-700 shadow-2xl shadow-black/50"
                                        : "bg-white border-gray-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10"
                                    }
                                `}
                            >
                                {/* Popular badge */}
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
                                        <button
                                            onClick={() => handleUpgrade(tier.id)}
                                            disabled={tier.id === "free" || processingPlan !== null}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                                ${tier.variant === 'filled'
                                                    ? (theme === 'dark'
                                                        ? 'bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800'
                                                        : 'bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50')
                                                    : (theme === 'dark'
                                                        ? 'bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50'
                                                        : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-white')
                                                }
                                                ${processingPlan === tier.id ? 'opacity-70 cursor-wait' : ''}
                                            `}
                                        >
                                            {processingPlan === tier.id ? (
                                                <><Loader2 className="h-3 w-3 animate-spin" /> Processing...</>
                                            ) : (
                                                <>{tier.cta} <ChevronRight className="w-3.5 h-3.5" /></>
                                            )}
                                        </button>
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
                                    <div className={`mt-4 pt-4 border-t ${theme === "dark" ? "border-zinc-600" : "border-gray-200"}`}>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                ₹{tier.price}
                                            </span>
                                            <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                                                /month
                                            </span>
                                        </div>
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
                                <div className={`h-px w-full mb-6 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`} />

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

                {/* ===== PAYMENT HISTORY ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`rounded-[2rem] border overflow-hidden
                        ${theme === "dark"
                            ? "bg-neutral-900 border-zinc-800"
                            : "bg-white border-gray-200 shadow-sm"
                        }`}
                >
                    <div className={`px-6 sm:px-8 py-5 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}>
                        <h3 className={`text-base font-bold flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            <Receipt className="h-4 w-4 text-violet-500" />
                            Payment History
                        </h3>
                    </div>

                    {payments.length === 0 ? (
                        <div className="py-14 text-center">
                            <CreditCard className={`h-10 w-10 mx-auto mb-3 ${theme === "dark" ? "text-zinc-700" : "text-neutral-300"}`} />
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-neutral-500"}`}>No payments yet</p>
                            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-600" : "text-neutral-400"}`}>Your payment history will appear here</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile: Card Layout */}
                            <div className="md:hidden divide-y divide-gray-100 dark:divide-zinc-800">
                                {payments.map((payment) => (
                                    <div key={payment.id} className="px-5 py-4 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                                    {format(new Date(payment.createdAt), "MMM d, yyyy")}
                                                </span>
                                            </div>
                                            {getStatusBadge(payment.status)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className={`text-sm font-semibold capitalize ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                    {payment.planType}
                                                </span>
                                                <span className="text-gray-400 text-xs ml-1 capitalize">({payment.planDuration})</span>
                                            </div>
                                            <span className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                ₹{(payment.amount / 100).toLocaleString()}
                                            </span>
                                        </div>
                                        {payment.method && (
                                            <p className={`text-xs capitalize ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                                                via {payment.method}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Desktop: Table Layout */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className={`border-b ${theme === "dark" ? "border-zinc-800 bg-zinc-800/30" : "border-gray-100 bg-gray-50/50"}`}>
                                            <th className={`text-left py-3 px-6 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Date</th>
                                            <th className={`text-left py-3 px-6 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Plan</th>
                                            <th className={`text-left py-3 px-6 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Amount</th>
                                            <th className={`text-left py-3 px-6 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Method</th>
                                            <th className={`text-left py-3 px-6 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id} className={`border-b transition-colors ${theme === "dark" ? "border-zinc-800/50 hover:bg-zinc-800/20" : "border-gray-100 hover:bg-gray-50/50"}`}>
                                                <td className={`py-3.5 px-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                        {format(new Date(payment.createdAt), "MMM d, yyyy")}
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <span className={`font-medium capitalize ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{payment.planType}</span>
                                                    <span className="text-gray-400 text-xs ml-1 capitalize">({payment.planDuration})</span>
                                                </td>
                                                <td className={`py-3.5 px-6 font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                    ₹{(payment.amount / 100).toLocaleString()}
                                                </td>
                                                <td className={`py-3.5 px-6 capitalize ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {payment.method || "—"}
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    {getStatusBadge(payment.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </DashboardLayout>
    )
}
