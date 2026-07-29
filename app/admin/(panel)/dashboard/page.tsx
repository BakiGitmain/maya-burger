"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Admin = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  last_login: string | null;
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [admin, setAdmin] = useState<Admin | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await fetch(
          "/backend/api/admin/me",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        const data = await response.json();

        setAdmin(data.admin);
      } catch (error) {
        console.error("Load admin error:", error);

        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(
        "/backend/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.replace("/admin/login");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-zinc-400">
          Loading dashboard...
        </p>
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-3xl font-semibold">
        Maya Burger Dashboard
      </h1>

      <div className="mt-8 space-y-2">
        <p>
          Welcome,{" "}
          <span className="font-semibold">
            {admin.name}
          </span>
        </p>

        <p className="text-zinc-400">
          Username: @{admin.username}
        </p>

        <p className="text-zinc-400">
          Email: {admin.email}
        </p>

        <p className="text-zinc-400">
          Role: {admin.role}
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-8 rounded-xl bg-white px-5 py-3 font-medium text-black"
      >
        Logout
      </button>
    </main>
  );
}