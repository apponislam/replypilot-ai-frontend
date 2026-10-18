"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Provider store={store}>
            {mounted ? (
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            ) : (
                children
            )}
        </Provider>
    );
}

export default ReduxProviders;
