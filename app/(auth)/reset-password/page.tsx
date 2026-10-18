import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Create New Password | ReplyPilot",
  description:
    "Set a new secure password for your ReplyPilot customer support account.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/reset-password",
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-ocean" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
