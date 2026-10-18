"use client";

import React from "react";
import { MessageSquareText, Sparkles, Star, ArrowUpRight } from "lucide-react";

export function AuthSidebar() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-1/2 p-14 bg-navy-dark text-porcelain border-r border-navy/60 select-none overflow-hidden">
      {/* Subtle fine geometric grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-porcelain) 1px, transparent 1px), linear-gradient(to bottom, var(--color-porcelain) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft gradient wash using ocean blue and mint */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-ocean/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center text-white font-bold shadow-md shadow-ocean/20">
            <MessageSquareText className="w-5 h-5 text-porcelain" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-porcelain block">
              ReplyPilot
            </span>
            <span className="text-[11px] text-mint font-medium tracking-wide">
              Customer Support Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/80 border border-navy-border text-xs text-porcelain font-medium">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          System Operational
        </div>
      </div>

      {/* Main Showcase Section */}
      <div className="relative z-10 my-auto py-10 space-y-8 max-w-lg">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy/70 border border-navy-border text-xs font-semibold text-mint">
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            Designed for Modern Support Teams
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-porcelain leading-tight">
            Speed up your support queue without losing the human touch.
          </h1>
          <p className="text-sm text-porcelain/70 leading-relaxed">
            Empower your team with intelligent draft suggestions, real-time ticket triage, and seamless omnichannel replies that customers appreciate.
          </p>
        </div>

        {/* Real Product UI Mockup */}
        <div className="rounded-2xl bg-navy-deep/90 border border-navy p-6 space-y-4 shadow-xl backdrop-blur-sm">
          {/* Ticket Header */}
          <div className="flex items-center justify-between pb-3 border-b border-navy/80">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-mint/20 text-mint border border-mint/30">
                Ticket #4109
              </span>
              <span className="text-xs font-medium text-porcelain/70">Shopify Integration</span>
            </div>
            <span className="text-xs text-mint">Response time: 42s</span>
          </div>

          {/* Customer Message */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-porcelain/60">
              <span className="font-semibold text-porcelain">Sarah Lindqvist • Acme Corp</span>
              <span>10:24 AM</span>
            </div>
            <p className="p-3.5 rounded-xl bg-navy/50 border border-navy/60 text-porcelain/90 leading-relaxed">
              &quot;Can we sync refund webhooks directly to our accounting ledger without manual CSV exports?&quot;
            </p>
          </div>

          {/* Drafted Response Card */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-porcelain/60">
              <span className="font-semibold text-mint flex items-center gap-1.5">
                Suggested Resolution
              </span>
              <span className="text-[11px] text-porcelain/60">Reviewed by Team</span>
            </div>
            <div className="p-3.5 rounded-xl bg-ocean/15 border border-ocean/40 text-porcelain leading-relaxed space-y-2">
              <p>
                Hi Sarah, yes! You can enable automated ledger sync under <strong>Settings → Webhooks → Financial Events</strong>. All refund payloads will post immediately.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-ocean/30 text-[11px]">
                <span className="text-porcelain/60">Tone: Clear & Direct</span>
                <span className="text-mint font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                  Approved <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonial */}
        <div className="rounded-xl p-4 bg-navy-deep/60 border border-navy/70 space-y-3">
          <div className="flex items-center gap-1 text-mint">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-mint text-mint" />
            ))}
          </div>
          <p className="text-xs text-porcelain/80 italic leading-relaxed">
            &quot;ReplyPilot reduced our median first-response time from 2 hours to 45 seconds. It handles our routine questions flawlessly while keeping our human tone.&quot;
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-ocean text-porcelain flex items-center justify-center font-bold text-xs">
              MV
            </div>
            <div>
              <div className="text-xs font-semibold text-porcelain">Marcus Vance</div>
              <div className="text-[11px] text-mint">Head of Support, Northscale Logistics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs text-porcelain/60 pt-6 border-t border-navy">
        <span>© 2026 ReplyPilot Inc. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-porcelain transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-porcelain transition-colors cursor-pointer">Security</span>
          <span className="hover:text-porcelain transition-colors cursor-pointer">Documentation</span>
        </div>
      </div>
    </div>
  );
}

export default AuthSidebar;
