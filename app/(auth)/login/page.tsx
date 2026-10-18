import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | ReplyPilot - Customer Support Platform",
  description:
    "Sign in to your ReplyPilot workspace to manage customer tickets, review smart drafts, and automate your support queue.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
