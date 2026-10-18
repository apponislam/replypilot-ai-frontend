import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyNewEmailForm } from "@/components/forms/VerifyNewEmailForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Confirm Email Update | ReplyPilot",
  description:
    "Confirm and verify your updated account email address on ReplyPilot.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/verify-new-email",
  },
};

export default function VerifyNewEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-ocean" />
        </div>
      }
    >
      <VerifyNewEmailForm />
    </Suspense>
  );
}
