import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | ReplyPilot",
    description: "Learn how ReplyPilot collects, processes, and protects your customer data and support communications.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-foreground">
            {/* Top Breadcrumb & Back */}
            <div className="mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Page Header */}
            <div className="space-y-3 pb-8 border-b border-border/60">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/15 text-teal-800 dark:text-mint text-xs font-semibold">
                    <Lock className="size-3.5" />
                    <span>Privacy &amp; Data Security</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Privacy Policy
                </h1>
                <p className="text-sm text-muted-foreground">
                    Last updated: October 19, 2026 • Effective Date: January 1, 2026
                </p>
            </div>

            {/* Quick Summary Callout */}
            <div className="my-8 rounded-2xl border border-mint/30 bg-mint/5 p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-800 dark:text-mint">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Privacy Highlights</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We only collect data necessary to provide and operate the ReplyPilot AI support platform. We encrypt all data in transit and at rest. We never sell your personal or customer data, and your private email exchanges are never used to train public generative AI models.
                </p>
            </div>

            {/* Document Content */}
            <div className="space-y-10 text-sm leading-relaxed text-foreground/90">
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        1. Information We Collect
                    </h2>
                    <p className="text-muted-foreground">
                        We collect the following categories of information:
                    </p>
                    <ul className="space-y-2 list-none pl-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-mint mt-0.5 shrink-0" />
                            <span><strong>Account Details:</strong> Name, work email address, hashed passwords, and contact preferences provided during registration.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-mint mt-0.5 shrink-0" />
                            <span><strong>Support Inquiries &amp; Emails:</strong> Inbound customer messages, sender email addresses, timestamps, and thread history synchronized to provide AI triage and response drafting.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-mint mt-0.5 shrink-0" />
                            <span><strong>Usage &amp; Performance Telemetry:</strong> Log files, response latency metrics, and feature interactions used solely to maintain system reliability.</span>
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        2. How We Use Your Information
                    </h2>
                    <p className="text-muted-foreground">
                        We use collected information exclusively to:
                    </p>
                    <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                        <li>Generate contextual draft responses and support triage recommendations.</li>
                        <li>Dispatch outbound replies to customer tickets when approved by you or your autopilot rules.</li>
                        <li>Authenticate accounts and prevent unauthorized system access.</li>
                        <li>Provide platform updates, service notifications, and technical customer assistance.</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        3. AI Processing and Model Confidentiality
                    </h2>
                    <p className="text-muted-foreground">
                        When customer messages are processed to generate draft replies, data is transmitted exclusively via enterprise-grade, encrypted zero-retention AI pipelines. Your proprietary communications are not saved by foundation model providers and are never used to train public models.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        4. Data Sharing and Third Parties
                    </h2>
                    <p className="text-muted-foreground">
                        ReplyPilot does not sell, rent, or trade your data. We only share information with trusted infrastructure sub-processors (such as cloud hosting and transactional email delivery providers) strictly bound by data processing agreements (DPAs).
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        5. Data Retention &amp; Deletion
                    </h2>
                    <p className="text-muted-foreground">
                        You have full control over your data. You may delete individual emails, customer tickets, or your entire organization account at any time via the Settings panel. Upon account deletion, all associated data is permanently purged from our active databases.
                    </p>
                </section>

                <section className="space-y-3 pt-6 border-t border-border/60">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        6. Contact Our Privacy Officer
                    </h2>
                    <p className="text-muted-foreground">
                        For questions regarding this Privacy Policy or to exercise your GDPR / CCPA data subject rights, reach out to our team:
                    </p>
                    <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">ReplyPilot Privacy &amp; Data Protection</p>
                        <p className="flex items-center gap-1.5">
                            <Mail className="size-3.5 text-ocean" />
                            <a href="mailto:privacy@replypilot.com" className="text-ocean hover:underline">
                                privacy@replypilot.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
