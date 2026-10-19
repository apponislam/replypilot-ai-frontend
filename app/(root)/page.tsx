import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Zap,
    ShieldCheck,
    Bot,
    Sliders,
    Clock,
    Lock,
    Check,
    Sparkles,
    Send,
    HelpCircle,
    UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "ReplyPilot AI - Intelligent Customer Email Reply & Automation Platform",
    description:
        "Accelerate customer resolution times with AI-powered draft responses, customizable tone personas, and autonomous auto-pilot email dispatch. Powered by private open-source LLMs.",
    keywords: [
        "customer support email automation",
        "AI draft replies",
        "email auto-pilot",
        "open source LLM support",
        "customer service AI assistant",
        "helpdesk automation",
    ],
    openGraph: {
        title: "ReplyPilot AI - Intelligent Customer Email Reply Automation",
        description:
            "Automate routine customer emails and empower support reps with brand-aligned response drafts.",
        url: "https://replypilot.apponislam.top",
        siteName: "ReplyPilot",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ReplyPilot AI - Customer Email Automation Platform",
        description:
            "Empower your support team with instant, brand-aligned email response drafts and autonomous auto-pilot dispatch.",
    },
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 overflow-hidden bg-linear-to-b from-ocean/5 via-background to-background dark:from-navy/20 dark:via-background dark:to-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Top Announcement Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ocean/10 dark:bg-navy/50 border border-ocean/20 dark:border-navy-border text-xs font-semibold text-ocean dark:text-mint mb-8 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-ocean animate-pulse" />
                        <span>Self-Hosted Open-Source AI</span>
                        <span className="text-zinc-400">•</span>
                        <span className="font-normal text-muted-foreground">
                            Private Ollama Engine via Cloudflare Tunnel
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
                        Turn customer emails into{" "}
                        <span className="bg-linear-to-r from-ocean via-navy-border to-navy dark:from-mint dark:to-ocean bg-clip-text text-transparent">
                            brand-aligned replies in seconds.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        ReplyPilot analyzes incoming support emails, applies your business guidelines,
                        and drafts context-aware responses ready for 1-click human approval — or
                        autonomous dispatch in Auto-Pilot mode.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-12 px-7 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-base shadow-sm shadow-ocean/25 transition-all">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="h-12 px-7 rounded-xl border-border bg-background hover:bg-muted font-medium text-base text-foreground transition-all"
                            >
                                Sign In to Workspace
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Guarantees */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-ocean dark:text-mint" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-ocean dark:text-mint" />
                            <span>100% private data architecture</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-ocean dark:text-mint" />
                            <span>5-minute workspace setup</span>
                        </div>
                    </div>

                    {/* 2. REALISTIC PRODUCT PREVIEW DESK */}
                    <div className="mt-16 sm:mt-20 max-w-5xl mx-auto rounded-2xl bg-navy-dark p-2 sm:p-4 shadow-2xl border border-navy">
                        <div className="rounded-xl bg-navy border border-navy/80 text-left overflow-hidden text-porcelain">
                            {/* Window Top Bar */}
                            <div className="px-4 py-3 bg-navy-deep border-b border-navy flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                    <span className="w-3 h-3 rounded-full bg-mint inline-block" />
                                    <span className="ml-3 text-xs text-zinc-400 font-mono">
                                        replypilot.apponislam.top/dashboard/replies
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-zinc-300">
                                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-mint/15 text-mint border border-mint/25 text-[11px] font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                                        Ollama Model Active
                                    </span>
                                </div>
                            </div>

                            {/* Mockup Body: 2-column Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-navy text-xs">
                                {/* Column 1: Active Inquiries Queue */}
                                <div className="md:col-span-5 p-4 space-y-3 bg-navy-deep/60">
                                    <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider pb-1">
                                        <span>AI Draft Queue (3 Active)</span>
                                        <span className="text-mint font-mono text-[10px]">Auto-Sync On</span>
                                    </div>

                                    {/* Item 1 - Active */}
                                    <div className="p-3.5 rounded-xl bg-ocean/20 border border-ocean/50 space-y-1.5 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-white">Alex Rivera</span>
                                            <span className="text-[10px] text-mint">Just now</span>
                                        </div>
                                        <p className="text-zinc-200 text-xs truncate font-medium">
                                            Enterprise API limits & team workspace questions
                                        </p>
                                        <div className="flex items-center gap-2 pt-0.5">
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-ocean/30 text-mint border border-ocean/40">
                                                High Priority
                                            </span>
                                            <span className="text-[10px] text-zinc-400">Tone: Professional</span>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="p-3.5 rounded-xl bg-navy/40 border border-navy/60 space-y-1.5 opacity-75 hover:opacity-95 transition-opacity">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-zinc-200">Sarah Jenkins</span>
                                            <span className="text-[10px] text-zinc-400">6m ago</span>
                                        </div>
                                        <p className="text-zinc-400 text-xs truncate">
                                            Can we update our billing cycle to annual invoicing?
                                        </p>
                                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-navy-deep text-zinc-400 border border-navy">
                                            Draft Ready
                                        </span>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="p-3.5 rounded-xl bg-navy/30 border border-navy/50 space-y-1.5 opacity-60">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-zinc-300">David Chen</span>
                                            <span className="text-[10px] text-zinc-500">22m ago</span>
                                        </div>
                                        <p className="text-zinc-500 text-xs truncate">
                                            Return policy window inquiry for order #5821
                                        </p>
                                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                                            Approved & Sent
                                        </span>
                                    </div>
                                </div>

                                {/* Column 2: Active Customer Email & AI Draft */}
                                <div className="md:col-span-7 p-6 space-y-5 bg-navy/40">
                                    {/* Customer Inquiry */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-zinc-400 text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-zinc-100">Alex Rivera</span>
                                                <span className="text-[11px] text-zinc-400 font-mono">
                                                    &lt;alex.rivera@fintech-scale.io&gt;
                                                </span>
                                            </div>
                                            <span>10:32 AM</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-navy-deep border border-navy text-zinc-200 leading-relaxed text-xs">
                                            &quot;Hi ReplyPilot Team! We are evaluating your platform for our 12-person support desk.
                                            Can each rep customize their response tone, and what controls exist when enabling Auto-Pilot mode?&quot;
                                        </div>
                                    </div>

                                    {/* AI Smart Draft Box */}
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="size-3.5 text-mint" />
                                                <span className="font-bold text-mint text-xs">
                                                    ReplyPilot AI Draft
                                                </span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-mint/15 text-mint border border-mint/25">
                                                    Guideline Matched
                                                </span>
                                            </div>
                                            <span className="text-[11px] text-zinc-400">Generated in 0.6s</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-ocean/15 border border-ocean/30 text-zinc-100 space-y-3 leading-relaxed text-xs">
                                            <p>
                                                Hello Alex! Thank you for reaching out to ReplyPilot.
                                            </p>
                                            <p>
                                                Yes, absolutely! Each representative can configure their individual voice personality
                                                (from Professional B2B to Friendly &amp; Warm) and sender signature. Meanwhile,
                                                administrators maintain full system governance with master guidelines and can toggle
                                                Autonomous Auto-Pilot mode when they want verified inbound emails dispatched hands-free.
                                            </p>
                                            <p>
                                                Would you like me to provision a test workspace for your team this afternoon?
                                            </p>

                                            {/* Tone Pills & Send Action */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-ocean/20">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <span className="text-[10px] text-zinc-400 font-medium mr-1">Tone:</span>
                                                    <span className="px-2 py-0.5 rounded bg-ocean text-white font-semibold text-[10px]">
                                                        Professional
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded bg-navy-deep text-zinc-400 text-[10px] border border-navy hover:text-zinc-200">
                                                        Friendly
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded bg-navy-deep text-zinc-400 text-[10px] border border-navy hover:text-zinc-200">
                                                        Concise
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-ocean hover:bg-ocean-dark text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
                                                >
                                                    <Send className="size-3" />
                                                    <span>Send Reply</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. METRICS SECTION */}
            <section className="py-12 border-y border-border/50 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">
                        Engineered for High-Velocity Customer Communication
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">85%</div>
                            <div className="text-xs text-muted-foreground">Faster first response latency</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">5x</div>
                            <div className="text-xs text-muted-foreground">Support rep draft throughput</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">5</div>
                            <div className="text-xs text-muted-foreground">Adaptive tone personalities</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">100%</div>
                            <div className="text-xs text-muted-foreground">Private self-hosted LLM execution</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. KEY FEATURES SECTION */}
            <section id="features" className="py-24 bg-background scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">
                            Platform Features
                        </h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            Everything you need to automate and elevate customer email support.
                        </h3>
                        <p className="text-base text-muted-foreground">
                            From instant draft queues to hands-free auto-pilot dispatch, ReplyPilot brings
                            enterprise-grade intelligence without cloud token fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Instant AI Draft Queue</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Automatically compose brand-accurate response drafts the moment a customer inquiry arrives.
                                Support agents can review, tweak, and dispatch in one click.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Autonomous Auto-Pilot Mode</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Administrators can activate Auto-Pilot mode to let the AI draft and dispatch verified answers
                                automatically with zero human bottleneck.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Sliders className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">5 Adaptive Voice Personas</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose from Professional, Friendly &amp; Warm, Concise &amp; Direct, Executive Formal,
                                or Casual tones to match the exact temperament of your customer.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Custom Business Guidelines</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Set persistent rules, FAQ instructions, and policy boundaries (e.g. return windows, refund procedures)
                                that the AI strictly abides by in every draft.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Private Open-Source LLMs</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Powered by self-hosted Ollama open-source models tunneled securely via Cloudflare.
                                Zero third-party cloud lock-in and 100% data confidentiality.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Dual Role-Based Workspaces</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Separate workspaces for Admins (system analytics, inbound email explorer, auto-pilot switches)
                                and Support Staff (draft queue, approval, personal signatures).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. HOW IT WORKS SECTION */}
            <section id="how-it-works" className="py-24 bg-muted/20 border-t border-border/40 scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">
                            Workflow
                        </h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            How ReplyPilot streamlines your email inbox in 3 steps.
                        </h3>
                        <p className="text-base text-muted-foreground">
                            Built to integrate seamlessly into your day-to-day customer communication cycle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="p-8 rounded-2xl border border-border bg-card space-y-4 relative">
                            <div className="size-10 rounded-xl bg-ocean text-white font-bold text-sm flex items-center justify-center">
                                1
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Inbound Ingestion</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Customer inquiries flow into your ReplyPilot workspace with recipient metadata, subject lines,
                                and full message context preserved.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-8 rounded-2xl border border-border bg-card space-y-4 relative">
                            <div className="size-10 rounded-xl bg-ocean text-white font-bold text-sm flex items-center justify-center">
                                2
                            </div>
                            <h4 className="text-lg font-bold text-foreground">AI Draft Generation</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                The open-source inference engine analyzes customer questions against your custom guidelines
                                and active tone persona to craft an accurate draft.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-8 rounded-2xl border border-border bg-card space-y-4 relative">
                            <div className="size-10 rounded-xl bg-ocean text-white font-bold text-sm flex items-center justify-center">
                                3
                            </div>
                            <h4 className="text-lg font-bold text-foreground">1-Click Dispatch or Auto-Pilot</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Support reps review and send with a single click, or admins enable Auto-Pilot mode to dispatch
                                verified responses automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PRICING SECTION */}
            <section id="pricing" className="py-24 bg-background border-t border-border/40 scroll-mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">
                            Simple Pricing
                        </h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            Transparent plans designed to scale with your team.
                        </h3>
                        <p className="text-base text-muted-foreground">
                            All plans include full access to smart drafts, tone personas, and a 14-day free trial.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                        {/* Starter */}
                        <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Starter</div>
                                <p className="text-xs text-muted-foreground">
                                    For solo founders and early-stage desks getting started with email automation.
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">$29</span>
                                    <span className="text-xs text-muted-foreground">/ month</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Up to 1,000 AI draft suggestions / mo</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>3 support agent seats included</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>All 5 tone personas</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Custom guideline instructions</span>
                                    </li>
                                </ul>
                            </div>
                            <Link href="/register">
                                <Button variant="outline" className="w-full h-11 rounded-xl font-medium">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Pro Support - Featured */}
                        <div className="p-8 rounded-2xl border-2 border-ocean bg-card flex flex-col justify-between space-y-6 relative shadow-xl shadow-ocean/10">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ocean text-white text-[11px] font-bold uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Pro Support</div>
                                <p className="text-xs text-muted-foreground">
                                    For growing support desks needing unlimited drafts and autonomous dispatch.
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">$79</span>
                                    <span className="text-xs text-muted-foreground">/ month</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Unlimited AI draft suggestions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>10 support agent seats included</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Autonomous Auto-Pilot dispatch</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Inbound email analytics & logs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Priority model latency</span>
                                    </li>
                                </ul>
                            </div>
                            <Link href="/register">
                                <Button className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium shadow-sm shadow-ocean/25">
                                    Start 14-Day Free Trial
                                </Button>
                            </Link>
                        </div>

                        {/* Enterprise */}
                        <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Enterprise</div>
                                <p className="text-xs text-muted-foreground">
                                    For high-volume operations requiring dedicated tunnels and custom SLAs.
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">Custom</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Unlimited drafts &amp; seats</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Dedicated private Cloudflare tunnel</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Dedicated account manager &amp; SLA</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Custom model fine-tuning support</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="mailto:replypilotai@apponislam.top">
                                <Button variant="outline" className="w-full h-11 rounded-xl font-medium">
                                    Contact Sales
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FAQ SECTION */}
            <section id="faq" className="py-24 bg-muted/20 border-t border-border/40 scroll-mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">
                            Questions &amp; Answers
                        </h2>
                        <h3 className="text-3xl font-extrabold text-foreground">
                            Frequently Asked Questions
                        </h3>
                    </div>

                    <div className="space-y-6 text-sm">
                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">
                                How does ReplyPilot generate accurate email responses?
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                ReplyPilot uses self-hosted open-source LLMs connected via a secure Cloudflare Tunnel.
                                The AI reads the incoming inquiry, matches it against your custom business guidelines
                                and active tone persona, and synthesizes a high-accuracy draft in under a second.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">
                                What is the difference between Manual Review and Autonomous Auto-Pilot?
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                In Manual Review mode, AI drafts are placed into your queue where support reps can inspect,
                                tweak, and send them with a single click. In Autonomous Auto-Pilot mode (toggled by admins),
                                verified inquiries are automatically drafted and dispatched with zero human delay.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">
                                Is our customer data kept private and confidential?
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Yes. Because ReplyPilot uses self-hosted open-source Ollama models, your customer emails
                                are never sent to third-party commercial AI providers or used to train public foundation models.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">
                                Can different team members have different response tones?
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                Yes. Each support representative can customize their own response personality (Professional,
                                Friendly, Concise, Executive Formal, or Casual) and individual sender identity in Settings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FINAL HIGH-CONVERSION CTA */}
            <section className="py-20 bg-navy-dark text-porcelain border-t border-navy text-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-ocean/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-mint/15 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                        Ready to accelerate your email support response speed?
                    </h2>
                    <p className="text-porcelain/80 max-w-xl mx-auto text-base sm:text-lg">
                        Empower your team with instant draft suggestions, custom guidelines, and autonomous auto-pilot dispatch.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-12 px-8 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-semibold text-base shadow-lg shadow-ocean/30 transition-all">
                                Get Started for Free
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="h-12 px-8 rounded-xl border-navy-border bg-transparent text-porcelain hover:bg-navy/60 font-medium text-base transition-all"
                            >
                                Sign In to Workspace
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
