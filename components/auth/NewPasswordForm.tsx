"use client";
import { useNewPassword } from "@/hooks/useAuth";
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewPasswordForm = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const newPasswordMutation = useNewPassword();

  const handleNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6 || confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }

    if (
      password === confirmPassword &&
      password.length >= 6 &&
      confirmPassword.length >= 6
    ) {
      newPasswordMutation.mutate({
        token: token,
        password: password,
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0D2946] shadow-md rounded-md gap-10">
      <h1 className="text-4xl font-extrabold text-white mb-4">New Password</h1>
      <form onSubmit={handleNewPassword}>
        <label htmlFor="password" className="text-white">
          New Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="hover:border-white border border-gray-500 p-3 rounded-md w-full mb-6 bg-[#0D2946]"
        />
        <label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="hover:border-white border border-gray-500 p-3 rounded-md w-full mb-6 bg-[#0D2946]"
        />
        <button
          type="submit"
          className="bg-[#3399FF] text-[#151936] flex items-center justify-center font-bold text-xl p-2 w-full rounded-md max-w-full "
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default NewPasswordForm;
