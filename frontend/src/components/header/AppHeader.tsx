import { useAuth } from "@/app/context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SignUpModal from "../auth/SignUpModal";
import LoginModal from "../auth/LoginModal";
import { SignUpData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "@/services/auth";

export default function AppHeader() {
  const { token, email, setAuth, logout } = useAuth();

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: (data) => {
      setAuth(data.token, data.email);
      console.log("Sign Up Successful:", data);
      setIsSignUpModalOpen(false);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: SignUpData) => login(data),
    onSuccess: (data) => {
      setAuth(data.token, data.email);
      console.log("Log in Successful:", data);
      setIsLoginModalOpen(false);
    },
  });

  const handleSignUpSubmit = (data: SignUpData) => {
    console.log("Submitting Sign Up Data:", data);
    signUpMutation.mutate(data);
  };

  const handleLoginSubmit = (data: SignUpData) => {
    console.log("Submitting Login Data:", data);
    loginMutation.mutate(data);
  };

  return (
    <>
      <header className="w-full flex justify-between items-center border-b pb-4 mb-8">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <div className="flex gap-4">
          {token && email ? (
            <div className="flex">
              <span className="flex items-center gap-1">
                <UserCircleIcon className="w-5 h-5" />
                {email}
              </span>
              <button
                onClick={() => logout()}
                className="ml-3 px-2 py-1 bg-rose-600 text-white font-semibold rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-1 focus:ring-rose-400 focus:ring-offset-1"
                // className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                Signup
              </button>
            </>
          )}
        </div>
        {/* Modal */}
      </header>
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSubmit={handleSignUpSubmit}
        loading={signUpMutation.isPending}
        error={signUpMutation.error}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLoginSubmit}
        loading={loginMutation.isPending}
        error={loginMutation.error}
      />
    </>
  );
}
