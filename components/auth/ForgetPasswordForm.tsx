"use client";
import React, { useState } from "react";
import { useForgetPassword } from "@/hooks/useAuth";
const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const forgetPasswordMutation = useForgetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgetPasswordMutation.mutate({ email });
  };

  return (
    <div
      className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Şifremi Unuttum
        </h2>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta Adresi
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Şifre Sıfırlama Bağlantısı Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
