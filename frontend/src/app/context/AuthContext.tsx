"use client";

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

interface AuthContextType {
  token: string | null;
  email: string | null;
  setAuth: (token: string | null, email: string | null) => void;
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

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const { token, email } = JSON.parse(storedAuth);
      setAuthState({ token, email });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        email: auth.email,
        setAuth,
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
