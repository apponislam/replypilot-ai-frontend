import { baseApi } from "../../api/baseApi";
import type { ApiResponse, AuthResponse, TUser, UserRole } from "./authSlice";

// Types for Auth Requests & Responses
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: UserRole;
    profileImage?: string;
    [key: string]: unknown;
}

export interface VerifyEmailParams {
    email: string;
    token?: string;
    otp?: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface RefreshTokenRequest {
    refreshToken?: string;
}

export interface RefreshTokenResponseData {
    accessToken: string;
    user?: TUser;
}

export interface RequestPasswordResetRequest {
    email: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface VerifyOtpResponseData {
    token: string;
}

export interface ResendOtpRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    profileImage?: string;
    [key: string]: unknown;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface DeleteAccountRequest {
    password: string;
}

export interface UpdateEmailRequest {
    email: string;
    password: string;
}

export interface VerifyNewEmailParams {
    token: string;
    email: string;
}

export interface ResendEmailUpdateRequest {
    password: string;
}

export interface SetUserPasswordRequest {
    userId: string;
    password: string;
}

export interface UpdateUserByAdminRequest {
    userId: string;
    data: FormData | Record<string, unknown>;
}

export const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // 1. Login user
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),

        // 2. Register user (supports FormData or JSON object)
        register: builder.mutation<AuthResponse, FormData | RegisterRequest>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),

        // 3. Verify email with token/otp
        verifyEmail: builder.query<ApiResponse<null>, VerifyEmailParams>({
            query: ({ email, token, otp }) => ({
                url: "/auth/verify-email",
                method: "GET",
                params: {
                    email,
                    ...(token ? { token } : {}),
                    ...(otp ? { otp } : {}),
                },
            }),
        }),

        // 4. Resend verification email
        resendVerificationEmail: builder.mutation<ApiResponse<null>, ResendVerificationRequest>({
            query: (body) => ({
                url: "/auth/resend-verification",
                method: "POST",
                body,
            }),
        }),

        // 5. Refresh access token
        refreshToken: builder.mutation<ApiResponse<RefreshTokenResponseData>, RefreshTokenRequest | void>({
            query: (body) => ({
                url: "/auth/refresh-token",
                method: "POST",
                body: body || {},
            }),
        }),

        // 6. Request password reset (sends OTP to email)
        requestPasswordReset: builder.mutation<ApiResponse<null>, RequestPasswordResetRequest>({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        // 7. Verify OTP for password reset
        verifyOtp: builder.mutation<ApiResponse<VerifyOtpResponseData>, VerifyOtpRequest>({
            query: (body) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body,
            }),
        }),

        // 8. Resend OTP for password reset
        resendOtp: builder.mutation<ApiResponse<null>, ResendOtpRequest>({
            query: (body) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body,
            }),
        }),

        // 9. Reset password with verification token
        resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),

        // 10. Get currently logged in user profile
        getMe: builder.query<ApiResponse<TUser>, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            providesTags: ["User"],
        }),

        // 11. Logout user
        logout: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),

        // 12. Update profile (supports FormData with profileImage file or JSON)
        updateProfile: builder.mutation<ApiResponse<TUser>, FormData | UpdateProfileRequest>({
            query: (body) => ({
                url: "/auth/profile",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        // 13. Change current password
        changePassword: builder.mutation<ApiResponse<null>, ChangePasswordRequest>({
            query: (body) => ({
                url: "/auth/change-password",
                method: "POST",
                body,
            }),
        }),

        // 14. Delete user account
        deleteAccount: builder.mutation<ApiResponse<null>, DeleteAccountRequest>({
            query: (body) => ({
                url: "/auth/delete-account",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        // 15. Request email update
        updateEmail: builder.mutation<ApiResponse<null>, UpdateEmailRequest>({
            query: (body) => ({
                url: "/auth/update-email",
                method: "POST",
                body,
            }),
        }),

        // 16. Verify new email
        verifyNewEmail: builder.query<ApiResponse<null>, VerifyNewEmailParams>({
            query: ({ token, email }) => ({
                url: "/auth/verify-new-email",
                method: "GET",
                params: { token, email },
            }),
            providesTags: ["User"],
        }),

        // 17. Resend email update verification
        resendEmailUpdate: builder.mutation<ApiResponse<null>, ResendEmailUpdateRequest>({
            query: (body) => ({
                url: "/auth/resend-email-update",
                method: "POST",
                body,
            }),
        }),

        // 18. Admin: Get user by ID
        getUserById: builder.query<ApiResponse<TUser>, string>({
            query: (userId) => ({
                url: `/auth/users/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [{ type: "User", id: userId }],
        }),

        // 19. Admin: Set password for a user
        setUserPassword: builder.mutation<ApiResponse<null>, SetUserPasswordRequest>({
            query: ({ userId, password }) => ({
                url: `/auth/set-password/${userId}`,
                method: "POST",
                body: { password },
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: "User", id: userId }],
        }),

        // 20. Admin: Update user by admin (supports FormData or JSON)
        updateUserBySuperAdmin: builder.mutation<ApiResponse<TUser>, UpdateUserByAdminRequest>({
            query: ({ userId, data }) => ({
                url: `/auth/users/${userId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { userId }) => ["User", { type: "User", id: userId }, "Admin"],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyEmailQuery,
    useLazyVerifyEmailQuery,
    useResendVerificationEmailMutation,
    useRefreshTokenMutation,
    useRequestPasswordResetMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
    useUpdateEmailMutation,
    useVerifyNewEmailQuery,
    useLazyVerifyNewEmailQuery,
    useResendEmailUpdateMutation,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useSetUserPasswordMutation,
    useUpdateUserBySuperAdminMutation,
} = authApi;
