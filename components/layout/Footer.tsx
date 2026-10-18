import React from "react";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-porcelain dark:bg-navy-deep text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-ocean text-white flex items-center justify-center shadow-xs">
                <MessageSquareText className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-foreground tracking-tight">
                ReplyPilot
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Intelligent customer response platform for high-velocity teams. Supercharge resolution times while maintaining your unique brand voice.
            </p>
            <div className="flex items-center gap-2 text-xs text-foreground font-medium pt-2">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              All systems normal
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Smart Drafts
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Omnichannel Sync
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Ticket Triage
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Integrations
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  Shopify
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  Zendesk
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  Intercom
                </span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  Slack & Email
                </span>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer transition-colors">
                  Security (SOC-2)
                </span>
              </li>
              <li>
                <a href="mailto:support@replypilot.com" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>© 2026 ReplyPilot Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Built with precision for support teams</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
