import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(1, "Full name is required").min(2, "Name must be at least 2 characters").max(60, "Name cannot exceed 60 characters"),
        email: z.string().min(1, "Work email is required").email("Please enter a valid work email"),
        phone: z.string().optional(),
        password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        agreeTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the Terms of Service to proceed",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid registered email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
    otp: z.string().min(6, "Verification code must be 6 digits").max(6, "Verification code must be 6 digits").regex(/^\d+$/, "Verification code must contain only numbers"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z
    .object({
        password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
