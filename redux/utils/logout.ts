import store, { persistor } from "../store";
import { logOut } from "../features/auth/authSlice";
import { baseApi } from "../api/baseApi";

export const performFullLogout = () => {
    try {
        store.dispatch(logOut());
        store.dispatch(baseApi.util.resetApiState());
        if (typeof window !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
        }
        persistor.purge();
    } catch (err) {
        console.error("Error during full logout:", err);
    }
};
