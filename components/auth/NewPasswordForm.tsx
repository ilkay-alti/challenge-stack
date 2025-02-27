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
    <>
      <form onSubmit={handleNewPassword}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default NewPasswordForm;
