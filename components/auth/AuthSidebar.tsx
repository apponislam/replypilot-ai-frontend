"use client";

import React from "react";
import { MessageSquareText, Sparkles, CheckCircle2 } from "lucide-react";

export function AuthSidebar() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-1/2 p-12 xl:p-16 bg-navy-dark text-porcelain border-r border-navy/60 select-none overflow-hidden">
      {/* Subtle soft gradient glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-ocean/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center text-white shadow-md shadow-ocean/25">
          <MessageSquareText className="w-5 h-5 text-porcelain" />
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight text-porcelain block">
            ReplyPilot
          </span>
          <span className="text-[11px] text-mint font-medium">
            AI Customer Support
          </span>
        </div>
      </div>

      {/* Minimal Hero Section - Clean & Low Content */}
      <div className="relative z-10 my-auto py-8 space-y-6 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/80 border border-navy-border text-xs font-semibold text-mint">
          <Sparkles className="w-3.5 h-3.5 text-mint" />
          <span>Intelligent Email Automation</span>
        </div>

        <h1 className="text-3xl xl:text-4xl font-bold tracking-tight text-porcelain leading-tight">
          Supercharge your customer support with AI.
        </h1>

        <p className="text-sm text-porcelain/70 leading-relaxed">
          Monitor inbound inquiries, draft accurate replies in seconds, and resolve support tickets effortlessly.
        </p>

        {/* 3 Simple Minimal Feature Points */}
        <div className="pt-2 space-y-2.5">
          {[
            "Instant AI-generated draft suggestions",
            "Autonomous auto-pilot for routine tickets",
            "Complete team review & one-click dispatch",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-xs text-porcelain/85">
              <CheckCircle2 className="w-4 h-4 text-mint shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Bottom Footer */}
      <div className="relative z-10 text-xs text-porcelain/50">
        <span>© 2026 ReplyPilot. All rights reserved.</span>
      </div>
    </div>
  );
}

export default AuthSidebar;
