import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailForm } from "@/components/forms/VerifyEmailForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Email Address | ReplyPilot",
  description:
    "Verify your email address to activate your ReplyPilot customer support workspace.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/verify-email",
  },
};

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-ocean" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
