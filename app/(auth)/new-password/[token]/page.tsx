import React from "react";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

interface ParamsType {
  token: string;
}

interface PropsType {
  params: ParamsType;
}

export default async function NewPasswordPage({ params }: PropsType) {
  const { token } = await params;

  return (
    <div>
      <h1>Reset Password</h1>
      {token && <NewPasswordForm token={token} />}
    </div>
  );
}
