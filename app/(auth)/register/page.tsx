import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | ReplyPilot - Intelligent Customer Support",
  description:
    "Start your 14-day free trial with ReplyPilot. Empower your support team with automated omnichannel resolution and smart drafts.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
