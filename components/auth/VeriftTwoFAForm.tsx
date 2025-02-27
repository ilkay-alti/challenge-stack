"use client";
import { useVerify2FA } from "@/hooks/useAuth";
import React from "react";

const VeriftTwoFAForm = () => {
  const Verify2FAMutation = useVerify2FA();
  const [token, setToken] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Verify2FAMutation.mutate({ token });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0D2946] shadow-md rounded-md">
      <h1 className="text-4xl font-extrabold text-white mb-4">Verify 2FA</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="token" className="text-white">
          Token
        </label>
        <input
          id="token"
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="hover:border-white border border-gray-500 p-3 rounded-md w-full mb-6 bg-[#0D2946]"
        />

        <button
          type="submit"
          className="bg-[#3399FF] text-[#151936] flex items-center justify-center font-bold text-xl p-2 w-full rounded-md max-w-full"
          disabled={Verify2FAMutation.isPending}
        >
          Verify 2FA
        </button>
      </form>
    </div>
  );
};

export default VeriftTwoFAForm;
