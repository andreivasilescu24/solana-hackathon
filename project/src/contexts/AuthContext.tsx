import React, { createContext, useContext, ReactNode } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface User {
  id: string;
  publicKey: string;
  email?: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    ready,
    authenticated: isPrivyAuthenticated,
    user: privyUser,
    login: privyLogin,
    logout: privyLogout,
  } = usePrivy();

  // Transform Privy user to our User type
  const user: User | null = privyUser
    ? {
        id: privyUser.id,
        publicKey: privyUser.wallet?.address || "",
        displayName:
          privyUser.twitter?.username ||
          privyUser.email?.address?.split("@")[0] ||
          "Anonymous User",
        email: privyUser.email?.address,
      }
    : null;

  const login = async () => {
    try {
      await privyLogin();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await privyLogout();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: isPrivyAuthenticated,
    isLoading: !ready, // Privy's ready is inverse of our isLoading
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
