// app/components/auth/loginForm.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardVisible, setCardVisible] = useState(false);
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleClose = () => {
    setCardVisible(false);
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0D2946] shadow-md rounded-md">
      <h1 className="text-4xl font-extrabold text-white mb-4">Login</h1>
      <form onSubmit={handleLogin} className="p-6">
        <div>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="hover:border-white border border-gray-500 p-3 rounded-md w-full mb-6 bg-[#0D2946]"
          />
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="hover:border-white border border-gray-500 p-3 rounded-md w-full mb-6 bg-[#0D2946]"
          />
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-[#3399FF] text-[#151936] flex items-center justify-center font-bold text-xl p-2 w-full rounded-md max-w-full "
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {cardVisible ? (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <ForgetPasswordForm />
        </div>
      ) : (
        <button onClick={() => setCardVisible(true)}>Forget Password</button>
      )}
    </div>
  );
}
