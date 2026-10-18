import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyOtpForm } from "@/components/forms/VerifyOtpForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Verify Security Code | ReplyPilot",
    description: "Enter your 6-digit verification code to confirm your identity and reset your password.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/verify-otp",
    },
};

export default function VerifyOtpPage() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-ocean" />
                </div>
            }
        >
            <VerifyOtpForm />
        </Suspense>
    );
}
