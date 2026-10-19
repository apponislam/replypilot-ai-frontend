import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logOut, setUser, TUser } from "../features/auth/authSlice";

interface RefreshTokenResponse {
    success: boolean;
    data: {
        accessToken: string;
        user?: TUser;
    };
}

const getBaseApiUrl = () => {
    let url = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5057";
    url = url.replace(/\/+$/, "");
    if (!url.endsWith("/api/v1")) {
        url = `${url}/api/v1`;
    }
    return `${url}/`;
};

const baseQuery = fetchBaseQuery({
    baseUrl: getBaseApiUrl(),
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState)?.auth?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Skip re-auth attempt for login or refresh-token itself to avoid infinite loops
    const url = typeof args === "string" ? args : args.url;
    const isAuthEndpoint = url?.includes("/auth/login") || url?.includes("/auth/refresh-token");

    if (result?.error?.status === 401 && !isAuthEndpoint) {
        const refreshResult = await baseQuery({ url: "/auth/refresh-token", method: "POST", credentials: "include" }, api, extraOptions);

        if (refreshResult.data && typeof refreshResult.data === "object" && "data" in refreshResult.data) {
            const backendData = (refreshResult.data as RefreshTokenResponse).data;
            const state = api.getState() as RootState;
            const currentUser = backendData.user || state?.auth?.user;
            const accessToken = backendData.accessToken;

            if (accessToken && currentUser) {
                api.dispatch(setUser({ user: currentUser, token: accessToken }));
                // Retry the initial request with the newly set token
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
                api.dispatch(baseApi.util.resetApiState());
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                return { error: { status: 401, data: "Session expired" } };
            }
        } else {
            api.dispatch(logOut());
            api.dispatch(baseApi.util.resetApiState());
            if (typeof window !== "undefined") {
                localStorage.clear();
                sessionStorage.clear();
            }
            return { error: { status: 401, data: "Session expired" } };
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Admin", "Email", "Setting", "UserReply", "Dashboard"],
    endpoints: () => ({}),
});
