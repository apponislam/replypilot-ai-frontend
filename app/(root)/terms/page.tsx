import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms and Conditions | ReplyPilot",
    description: "Read the Terms and Conditions and Terms of Service governing your use of ReplyPilot AI customer support platform.",
};

export default function TermsAndConditionsPage() {
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-semibold">
                    <FileText className="size-3.5" />
                    <span>Legal Agreement</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Terms &amp; Conditions
                </h1>
                <p className="text-sm text-muted-foreground">
                    Last updated: October 19, 2026 • Effective Date: January 1, 2026
                </p>
            </div>

            {/* Quick Summary Callout */}
            <div className="my-8 rounded-2xl border border-ocean/30 bg-ocean/5 p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-ocean">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Plain-English Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    ReplyPilot is an AI-powered customer support assistant that helps your team triage, draft, and dispatch replies to incoming emails. You retain full ownership of your customer data and emails. We do not use your customer support conversations to train public AI models. By using ReplyPilot, you agree to respect acceptable use standards and safeguard your account credentials.
                </p>
            </div>

            {/* Document Content */}
            <div className="space-y-10 text-sm leading-relaxed text-foreground/90">
                {/* 1. Acceptance of Terms */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-muted-foreground">
                        By registering for, accessing, or utilizing the services provided by ReplyPilot (&quot;ReplyPilot&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), including our web application, APIs, and associated software (collectively, the &quot;Service&quot;), you (&quot;Customer&quot;, &quot;User&quot;, or &quot;you&quot;) agree to be legally bound by these Terms and Conditions (&quot;Terms&quot;).
                    </p>
                    <p className="text-muted-foreground">
                        If you are accepting these Terms on behalf of an enterprise, company, or organization, you represent and warrant that you possess full legal authority to bind such entity to these Terms.
                    </p>
                </section>

                {/* 2. Description of the Service */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        2. Description of the Service
                    </h2>
                    <p className="text-muted-foreground">
                        ReplyPilot provides an automated customer support platform featuring intelligent inbound ticket triage, AI response draft generation, manual review queues, and configurable autonomous autopilot modes.
                    </p>
                    <ul className="space-y-2 list-none pl-1 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-ocean mt-0.5 shrink-0" />
                            <span><strong>Assisted Mode:</strong> The platform analyzes incoming tickets and proposes drafts for human review, editing, and approval before sending.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-ocean mt-0.5 shrink-0" />
                            <span><strong>Autonomous Auto-Pilot Mode:</strong> When enabled by an administrator, the platform automatically generates and delivers email responses to customer queries based on configured guidelines and tone parameters.</span>
                        </li>
                    </ul>
                </section>

                {/* 3. Account Registration and Security */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        3. User Accounts and Security
                    </h2>
                    <p className="text-muted-foreground">
                        To access ReplyPilot, you must create an account. You agree to provide accurate, current, and complete registration information and keep it updated.
                    </p>
                    <p className="text-muted-foreground">
                        You are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted through your account. You agree to notify us immediately of any unauthorized use or security breach.
                    </p>
                </section>

                {/* 4. Customer Data & Privacy */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        4. Customer Data and Privacy
                    </h2>
                    <p className="text-muted-foreground">
                        <strong>Ownership:</strong> You retain all right, title, and interest in and to all emails, customer messages, attachments, and data transmitted to or processed by the Service (&quot;Customer Data&quot;).
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Data Protection:</strong> ReplyPilot handles all Customer Data strictly in compliance with industry security protocols and applicable privacy laws. We will never sell, rent, or lease your Customer Data to third parties.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>No Model Training:</strong> Your private email communications and support history are never utilized to train foundation models for public or third-party usage.
                    </p>
                </section>

                {/* 5. Acceptable Use Policy */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        5. Acceptable Use Policy
                    </h2>
                    <p className="text-muted-foreground">
                        You agree not to use the Service to:
                    </p>
                    <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                        <li>Send unsolicited bulk emails, spam, phishing, or deceptive messages.</li>
                        <li>Transmit malicious software, viruses, or harmful code.</li>
                        <li>Harass, defame, abuse, or violate the legal rights of any individual.</li>
                        <li>Attempt to reverse-engineer, decompile, or compromise the platform infrastructure.</li>
                        <li>Use automated scripts to overload or disrupt platform stability.</li>
                    </ul>
                </section>

                {/* 6. Intellectual Property */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        6. Intellectual Property
                    </h2>
                    <p className="text-muted-foreground">
                        All intellectual property rights in ReplyPilot, including software, algorithms, user interface designs, trademarks, and documentation, remain the exclusive property of ReplyPilot and its licensors.
                    </p>
                </section>

                {/* 7. Disclaimer of Warranties */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        7. Disclaimers and AI Output
                    </h2>
                    <p className="text-muted-foreground">
                        While ReplyPilot utilizes state-of-the-art language models, AI-generated responses are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. You acknowledge that AI drafts should be calibrated to your organization&apos;s standards, and you maintain final control over responses dispatched via manual review or automated rules.
                    </p>
                </section>

                {/* 8. Limitation of Liability */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        8. Limitation of Liability
                    </h2>
                    <p className="text-muted-foreground">
                        To the maximum extent permitted by law, ReplyPilot and its officers, directors, and employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to access the Service.
                    </p>
                </section>

                {/* 9. Termination */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        9. Termination
                    </h2>
                    <p className="text-muted-foreground">
                        You may terminate your account at any time via the Settings panel. ReplyPilot reserves the right to suspend or terminate accounts that breach these Terms or engage in fraudulent activities.
                    </p>
                </section>

                {/* 10. Contact Us */}
                <section className="space-y-3 pt-6 border-t border-border/60">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                        10. Contact and Inquiries
                    </h2>
                    <p className="text-muted-foreground">
                        If you have questions or concerns regarding these Terms and Conditions, please contact our legal and support team:
                    </p>
                    <div className="rounded-xl border border-border/70 bg-card p-4 space-y-1.5 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">ReplyPilot Legal &amp; Compliance</p>
                        <p className="flex items-center gap-1.5">
                            <Mail className="size-3.5 text-ocean" />
                            <a href="mailto:support@replypilot.com" className="text-ocean hover:underline">
                                support@replypilot.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
