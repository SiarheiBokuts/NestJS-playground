"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  token: string | null;
  email: string | null;
}

interface AuthContextType extends AuthState {
  setAuth: (token: string | null, email: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthState] = useState<AuthState>({
    token: null,
    email: null,
  });

  const setAuth = (token: string | null, email: string | null) => {
    const authData = { token, email };
    localStorage.setItem("auth", JSON.stringify(authData));
    setAuthState(authData);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuthState({ token: null, email: null });
  };

  const validateMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await fetch("/auth/validate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    },
    onSuccess: (data, token) => {
      setAuthState({ token, email: data.email });
      localStorage.setItem(
        "auth",
        JSON.stringify({ token, email: data.email })
      );
    },
    onError: () => {
      setAuthState({ token: null, email: null });
      localStorage.removeItem("auth");
    },
  });

  // Load auth state from localStorage on initial render and validate token
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      debugger;
      const authData: AuthState = JSON.parse(storedAuth);
      validateMutation.mutate(authData.token!);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        email: auth.email,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
