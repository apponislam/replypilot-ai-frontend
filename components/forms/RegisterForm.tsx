"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Camera,
  X,
} from "lucide-react";
import Image from "next/image";

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setServerError("Image file size must be less than 5MB.");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      if (serverError) setServerError(null);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: RegisterFormData) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const data = new FormData();
      data.append("name", values.name.trim());
      data.append("email", values.email.trim());
      data.append("password", values.password);
      data.append("role", "USER");
      if (values.phone?.trim()) {
        data.append("phone", values.phone.trim());
      }
      if (avatarFile) {
        data.append("profileImage", avatarFile);
      }

      const response = await registerUser(data).unwrap();

      if (response?.data?.accessToken && response?.data?.user) {
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.accessToken,
          })
        );
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 900);
      } else {
        setSuccessMessage(
          response?.message ||
            "Registration successful! Please check your email to verify your account."
        );
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      setServerError(
        errorObj?.data?.message ||
          errorObj?.message ||
          "Registration failed. Please check your information and try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start collaborating and resolving support tickets with ReplyPilot.
        </p>
      </div>

      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 p-3.5 rounded-xl bg-mint/15 border border-mint/30 text-teal-800 dark:text-mint text-sm"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form
        id="register-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        {/* Avatar Upload */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-porcelain dark:bg-navy-dark border border-border">
          <div className="relative group">
            <div className="w-13 h-13 rounded-xl overflow-hidden bg-white dark:bg-navy border border-border flex items-center justify-center">
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-navy dark:text-mint" />
              )}
            </div>

            {avatarPreview && (
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-0.5">
            <div className="text-xs font-semibold text-foreground">Profile Photo</div>
            <div className="text-[11px] text-muted-foreground">Optional, JPG or PNG up to 5MB</div>
            <input
              ref={fileInputRef}
              type="file"
              id="register-avatar-input"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ocean hover:text-ocean-dark dark:text-mint cursor-pointer pt-0.5"
            >
              <Camera className="w-3.5 h-3.5" />
              {avatarPreview ? "Change photo" : "Upload photo"}
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="register-name" required>
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Marcus Vance"
              className="pl-10"
              disabled={isLoading}
              error={Boolean(errors.name)}
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive font-medium pl-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <Label htmlFor="register-email" required>
            Work Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="marcus@company.com"
              className="pl-10"
              disabled={isLoading}
              error={Boolean(errors.email)}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive font-medium pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="register-phone">Phone Number (Optional)</Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              id="register-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              className="pl-10"
              disabled={isLoading}
              {...register("phone")}
            />
          </div>
        </div>

        {/* Passwords in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="register-password" required>
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="6+ chars"
                className="pl-10 pr-9"
                disabled={isLoading}
                error={Boolean(errors.password)}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive font-medium pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="register-confirm-password" required>
              Confirm
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat password"
                className="pl-10"
                disabled={isLoading}
                error={Boolean(errors.confirmPassword)}
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive font-medium pl-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-1 pt-1">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="register-agree-terms"
              className="w-4 h-4 mt-0.5 rounded border-border text-ocean focus:ring-ocean cursor-pointer"
              {...register("agreeTerms")}
            />
            <label
              htmlFor="register-agree-terms"
              className="text-xs text-muted-foreground leading-normal cursor-pointer select-none"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-ocean dark:text-mint hover:underline">
                Terms of Service
              </Link>{" "}
              and acknowledge the{" "}
              <Link href="/privacy" className="text-ocean dark:text-mint hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-destructive font-medium pl-6">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        <Button
          id="register-submit-button"
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-ocean hover:bg-ocean-dark text-white font-medium text-sm shadow-sm shadow-ocean/25 transition-all duration-150 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground pt-1">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-ocean hover:text-ocean-dark dark:text-mint hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
