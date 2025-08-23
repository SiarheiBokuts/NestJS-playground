"use client";

import { validateToken } from "@/services/auth";
import { AuthResponse } from "@/types/auth";
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
  /** ==============================
   *  State and auth methods
   *  ============================== */
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

  /** ==============================
   *  Mutation: validate token
   *  ============================== */
  const validateMutation = useMutation<
    Omit<AuthResponse, "token">,
    unknown,
    string
  >({
    mutationFn: (token) => validateToken(token),
    onSuccess: (data, tokenFromMutateCall) => {
      setAuth(tokenFromMutateCall, data.email); // обновляем authState и localStorage
    },
    onError: () => {
      setAuthState({ token: null, email: null });
      localStorage.removeItem("auth");
    },
  });

  /** ==============================
   *  Initialize auth from localStorage and validate token
   *  ============================== */
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData: AuthState = JSON.parse(storedAuth);
      validateMutation.mutate(authData.token!);
    }
  }, []);

  /** ==============================
   *  Render context provider
   *  ============================== */
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
