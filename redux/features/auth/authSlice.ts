import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type UserRole = "ADMIN" | "USER";

export interface TUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    profileImage?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    isDeleted: boolean;
    lastLogin?: string;
    pendingEmail?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages?: number;
        hasNext?: boolean;
        hasPrev?: boolean;
    };
}

export interface AuthSuccessData {
    user: TUser;
    accessToken: string;
}

export type AuthResponse = ApiResponse<AuthSuccessData>;

export interface TAuthState {
    user: null | TUser;
    token: null | string;
    redirectPath: string | null;
    justLoggedIn: boolean;
}

const initialState: TAuthState = {
    user: null,
    token: null,
    redirectPath: null,
    justLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.justLoggedIn = true;
        },
        updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.justLoggedIn = false;
        },
        setRedirectPath: (state, action: PayloadAction<string | null>) => {
            state.redirectPath = action.payload;
        },
        clearJustLoggedIn: (state) => {
            state.justLoggedIn = false;
        },
    },
});

export const { setUser, updateUser, setToken, logOut, setRedirectPath, clearJustLoggedIn } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
export const redirectPath = (state: RootState) => state.auth.redirectPath;
export const justLoggedIn = (state: RootState) => state.auth.justLoggedIn;
export const isAuthenticated = (state: RootState) => Boolean(state.auth.token && state.auth.user);
export const isAdmin = (state: RootState) => state.auth.user?.role === "ADMIN";
