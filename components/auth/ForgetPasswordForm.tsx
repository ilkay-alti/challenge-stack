"use client";
import React, { useState } from "react";
import { useForgetPassword } from "@/hooks/useAuth";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const forgetPasswordMutation = useForgetPassword();
  const isLoading = forgetPasswordMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgetPasswordMutation.mutate(
      { email },
      {
        onSettled: () => {
          // Handle any additional logic after the mutation is settled
        },
      },
    );
  };

  return (
    <div
      className="max-w-md w-full space-y-8 bg-[#0D2946] p-8 rounded-lg shadow-lg text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold ">Şifremi Unuttum</h2>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              E-posta Adresi
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="hover:border-white border border-gray-500 p-2 rounded-md w-full mb-2 bg-[#0D2946]"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#3399FF] text-[#151936] font-bold text-xl p-2 rounded-md w-full"
            disabled={isLoading}
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
