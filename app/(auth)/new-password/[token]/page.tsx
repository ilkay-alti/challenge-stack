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
    <div className="flex flex-col items-center justify-center h-screen ">
      {token && <NewPasswordForm token={token} />}
    </div>
  );
}
