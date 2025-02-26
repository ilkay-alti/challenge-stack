"use client";

import { useLogout } from "@/hooks/useAuth";

export default function LogoutButton() {
  const mutation = useLogout();

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
    </button>
  );
}
