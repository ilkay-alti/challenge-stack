"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const registerMutation = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, password, name });
  };

  return (
    <form
      onSubmit={handleRegister}
      className="p-6 bg-white shadow-md rounded-md"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-md w-full mb-2"
      />
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
        disabled={registerMutation.isPending}
        className="bg-green-500 text-white p-2 rounded-md w-full"
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </button>
      {registerMutation.error && (
        <p className="text-red-500 mt-2">{registerMutation.error.message}</p>
      )}
    </form>
  );
}
