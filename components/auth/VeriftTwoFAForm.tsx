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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VeriftTwoFAForm;
