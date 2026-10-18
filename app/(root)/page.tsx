import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Globe2, Layers, Clock, Headphones, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "ReplyPilot - Intelligent Customer Response & Ticket Automation Platform",
    description: "Accelerate customer resolution times by 78%. ReplyPilot equips support teams with intelligent draft suggestions, real-time ticket triage, and seamless omnichannel sync.",
    keywords: ["customer support automation", "support ticket triage", "helpdesk response assistant", "Shopify customer service", "omnichannel support platform", "customer experience automation"],
    openGraph: {
        title: "ReplyPilot - Customer Support at the Speed of Thought",
        description: "Automate tier-1 tickets and empower your support reps with instant, brand-aligned response drafts.",
        url: "https://replypilot.apponislam.top",
        siteName: "ReplyPilot",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ReplyPilot - Intelligent Customer Response Platform",
        description: "Automate tier-1 tickets and empower your support reps with instant, brand-aligned response drafts.",
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
                        <span>ReplyPilot 2.4 Released</span>
                        <span className="text-zinc-400">•</span>
                        <span className="font-normal text-muted-foreground">Smart Ticket Triage & Omnichannel Sync</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
                        Customer support at the <span className="bg-linear-to-r from-ocean via-navy-border to-navy dark:from-mint dark:to-ocean bg-clip-text text-transparent">speed of thought.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">ReplyPilot equips your customer success reps with instant draft suggestions, automated ticket prioritization, and seamless multi-channel resolution.</p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-12 px-7 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-base shadow-sm shadow-ocean/25 transition-all">
                                Start 14-Day Free Trial
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="h-12 px-7 rounded-xl border-border bg-background hover:bg-muted font-medium text-base text-foreground transition-all">
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
                            <span>5-minute setup</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-ocean dark:text-mint" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    {/* 2. PRODUCT DESK PREVIEW CARD */}
                    <div className="mt-16 sm:mt-20 max-w-5xl mx-auto rounded-2xl bg-navy-dark p-2 sm:p-4 shadow-2xl border border-navy">
                        <div className="rounded-xl bg-navy border border-navy/80 text-left overflow-hidden text-porcelain">
                            {/* Window Controls */}
                            <div className="px-4 py-3 bg-navy-deep border-b border-navy flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                    <span className="w-3 h-3 rounded-full bg-mint inline-block" />
                                    <span className="ml-3 text-xs text-zinc-400 font-mono">replypilot.app/inbox/ticket-9042</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-300">
                                    <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                                    Live Sync Connected
                                </div>
                            </div>

                            {/* Mockup Body: 3-column Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-navy text-xs">
                                {/* Column 1: Ticket Queue */}
                                <div className="md:col-span-4 p-4 space-y-3 bg-navy-deep/60">
                                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Incoming Tickets (14 Active)</div>
                                    <div className="p-3 rounded-xl bg-ocean/20 border border-ocean/40 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-white">Acme Corp</span>
                                            <span className="text-[10px] text-mint">Just now</span>
                                        </div>
                                        <p className="text-zinc-200 truncate">Webhook refund sync question</p>
                                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-ocean/30 text-mint">High Priority</span>
                                    </div>

                                    <div className="p-3 rounded-xl bg-navy/50 border border-navy/60 space-y-1 opacity-75">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-zinc-200">Global Logistics</span>
                                            <span className="text-[10px] text-zinc-400">4m ago</span>
                                        </div>
                                        <p className="text-zinc-400 truncate">Update shipping address on #7810</p>
                                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-navy-deep text-zinc-400">Standard</span>
                                    </div>
                                </div>

                                {/* Column 2: Active Conversation & Reply Suggestion */}
                                <div className="md:col-span-8 p-6 space-y-5 bg-navy/40">
                                    {/* Customer query */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between text-zinc-400">
                                            <span className="font-semibold text-zinc-200">Sarah Lindqvist</span>
                                            <span>10:24 AM</span>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-navy-deep border border-navy text-zinc-200 leading-relaxed">&quot;Hi Team! Can we route automatic refunds directly to our Stripe accounting ledger without downloading manual CSV reports every week?&quot;</div>
                                    </div>

                                    {/* ReplyPilot Draft */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-mint">ReplyPilot Smart Draft</span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-mint/20 text-mint border border-mint/30">99.4% Match</span>
                                            </div>
                                            <span className="text-zinc-400">Generated in 0.4s</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-ocean/15 border border-ocean/30 text-zinc-100 space-y-3 leading-relaxed">
                                            <p>
                                                Hello Sarah! Yes, you can enable direct ledger syncing under <strong>Settings → Webhooks → Financial Events</strong>. Once turned on, all refund payloads post directly in real-time.
                                            </p>
                                            <div className="flex items-center justify-between pt-2 border-t border-ocean/20">
                                                <span className="text-zinc-400">Tone: Clear & Helpful</span>
                                                <div className="flex items-center gap-2">
                                                    <button className="px-3 py-1 rounded-lg bg-ocean hover:bg-ocean-dark text-white font-medium text-xs shadow-xs transition-colors">1-Click Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SOCIAL PROOF / METRICS SECTION */}
            <section className="py-12 border-y border-border/50 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8">Empowering customer experience teams worldwide</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">78%</div>
                            <div className="text-xs text-muted-foreground">First-response reduction</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">42s</div>
                            <div className="text-xs text-muted-foreground">Median resolution time</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">99.4%</div>
                            <div className="text-xs text-muted-foreground">Response accuracy rate</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">4.9 / 5</div>
                            <div className="text-xs text-muted-foreground">Customer satisfaction (CSAT)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. KEY FEATURES SECTION */}
            <section id="features" className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">Platform Features</h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Built to make every support rep 10x more productive.</h3>
                        <p className="text-base text-muted-foreground">ReplyPilot unifies your knowledge base, CRM details, and previous resolutions to deliver accurate answers in seconds.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Instant Smart Drafts</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Generate high-quality, brand-accurate response drafts in milliseconds. Reps can approve or customize with a single keystroke.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Omnichannel Inbox</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Seamlessly connect Shopify orders, Zendesk tickets, live chat, and email into one unified queue with zero context loss.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Automated SLA Triage</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Identify VIP customers, urgent billing tickets, and high-risk churn signals instantly to ensure rapid escalation.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Globe2 className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Multilingual Support</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Resolve tickets across 40+ languages natively. Inbound questions translate automatically and outgoing drafts match local cultural nuance.</p>
                        </div>

                        {/* Card 5 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Human-in-the-Loop Safety</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">You stay in full control. Configure approval thresholds so complex or sensitive tickets always require rep authorization.</p>
                        </div>

                        {/* Card 6 */}
                        <div className="p-7 rounded-2xl border border-border/80 bg-card hover:border-ocean/40 transition-all duration-200 space-y-4 shadow-xs">
                            <div className="w-11 h-11 rounded-xl bg-ocean/10 text-ocean dark:text-mint flex items-center justify-center">
                                <Headphones className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground">Enterprise Security</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">SOC-2 compliant, end-to-end encrypted, and strict data isolation guarantees. Your customer conversations are never used to train public models.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PRICING SECTION */}
            <section id="pricing" className="py-24 bg-muted/20 border-t border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">Simple Pricing</h2>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Predictable pricing designed to scale with your team.</h3>
                        <p className="text-base text-muted-foreground">All plans include full access to smart drafts, team collaboration, and a 14-day free trial.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                        {/* Starter */}
                        <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Starter</div>
                                <p className="text-xs text-muted-foreground">For small teams getting started with support automation.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">$29</span>
                                    <span className="text-xs text-muted-foreground">/ month</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Up to 1,000 smart drafts / mo</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>3 team seats included</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Email & Shopify integration</span>
                                    </li>
                                </ul>
                            </div>
                            <Link href="/register">
                                <Button variant="outline" className="w-full h-11 rounded-xl font-medium">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Pro - Featured */}
                        <div className="p-8 rounded-2xl border-2 border-ocean bg-card flex flex-col justify-between space-y-6 relative shadow-xl shadow-ocean/10">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ocean text-white text-[11px] font-bold uppercase tracking-wider">Most Popular</div>
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Pro Growth</div>
                                <p className="text-xs text-muted-foreground">For scaling support desks needing multi-channel sync.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">$79</span>
                                    <span className="text-xs text-muted-foreground">/ month</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Up to 10,000 smart drafts / mo</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>10 team seats included</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>All integrations (Zendesk, Shopify, Slack)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Multilingual auto-translation</span>
                                    </li>
                                </ul>
                            </div>
                            <Link href="/register">
                                <Button className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium shadow-sm shadow-ocean/25">Start 14-Day Free Trial</Button>
                            </Link>
                        </div>

                        {/* Enterprise */}
                        <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="text-lg font-bold text-foreground">Enterprise</div>
                                <p className="text-xs text-muted-foreground">For high-volume brands requiring custom SLAs and models.</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-foreground">Custom</span>
                                </div>
                                <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Unlimited smart drafts</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Unlimited team seats</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Dedicated account manager & SLA</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-ocean dark:text-mint shrink-0" />
                                        <span>Custom private model fine-tuning</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="mailto:sales@replypilot.com">
                                <Button variant="outline" className="w-full h-11 rounded-xl font-medium">
                                    Contact Sales
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ SECTION */}
            <section id="faq" className="py-24 bg-background border-t border-border/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-ocean dark:text-mint">Questions & Answers</h2>
                        <h3 className="text-3xl font-extrabold text-foreground">Frequently Asked Questions</h3>
                    </div>

                    <div className="space-y-6 text-sm">
                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">How does ReplyPilot generate accurate response suggestions?</h4>
                            <p className="text-muted-foreground leading-relaxed">ReplyPilot connects to your knowledge base, previous resolved tickets, and live CRM data (such as order status or account tier). It synthesizes this context to produce precise, brand-aligned answers.</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">Does ReplyPilot send messages automatically without rep review?</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                By default, ReplyPilot operates in Human-in-the-Loop mode, presenting suggestions to reps for 1-click approval or quick customization. You can optionally enable full auto-resolution for simple tier-1 inquiries like tracking lookups.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">Is my customer data secure and private?</h4>
                            <p className="text-muted-foreground leading-relaxed">Yes. We strictly adhere to SOC-2 Type II standards and GDPR compliance. Your customer queries and data are isolated and never retained to train public third-party foundation models.</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-2">
                            <h4 className="font-bold text-foreground">Can I test ReplyPilot before committing to a paid plan?</h4>
                            <p className="text-muted-foreground leading-relaxed">Absolutely! We offer a full-featured 14-day free trial with no credit card required. You can connect your helpdesk and evaluate live drafts in minutes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FINAL HIGH-CONVERSION CTA */}
            <section className="py-20 bg-navy-dark text-porcelain border-t border-navy text-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-ocean/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-mint/15 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Ready to cut your ticket resolution times by 78%?</h2>
                    <p className="text-porcelain/80 max-w-xl mx-auto text-base sm:text-lg">Join thousands of customer support agents resolving inquiries faster with ReplyPilot. Set up in under 5 minutes.</p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button className="h-12 px-8 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-semibold text-base shadow-lg shadow-ocean/30 transition-all">
                                Get Started for Free
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="h-12 px-8 rounded-xl border-navy-border bg-transparent text-porcelain hover:bg-navy/60 font-medium text-base transition-all">
                                Sign In to Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
