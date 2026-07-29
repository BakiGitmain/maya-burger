"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          "/backend/api/admin/me",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          router.replace("/admin/dashboard");
          return;
        }

        router.replace("/admin/login");
      } catch (error) {
        console.error("Session check error:", error);

        router.replace("/admin/login");
      }
    };

    checkSession();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <p className="text-sm text-zinc-500">
        Checking session...
      </p>
    </main>
  );
}