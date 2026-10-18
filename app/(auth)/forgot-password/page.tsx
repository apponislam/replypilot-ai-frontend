import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | ReplyPilot",
  description:
    "Request a secure password reset code for your ReplyPilot account.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/forgot-password",
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
