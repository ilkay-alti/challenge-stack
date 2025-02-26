// app/components/auth/loginForm.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-md">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded-md w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-md w-full mb-2"
      />
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
      {loginMutation.error && (
        <p className="text-red-500 mt-2">{loginMutation.error.message}</p>
      )}
      <h1>ilkay@ilkay.ilkay</h1>
    </form>
  );
}
