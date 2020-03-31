import React from "react";

interface Login {
    isAuthenticated ?: boolean,
}

export const LoginContext = React.createContext<Login>({ isAuthenticated: false});