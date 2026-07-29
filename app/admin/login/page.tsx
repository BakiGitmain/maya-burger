"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading || redirecting) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/backend/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid username or password"
        );
        return;
      }

      setRedirecting(true);

      setTimeout(() => {
        router.replace("/admin/dashboard");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {redirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]">
          <div className="flex flex-col items-center">
            <Image
              src="/images/loader.gif"
              alt="Loading dashboard"
              width={64}
              height={64}
              unoptimized
              priority
            />

            <p className="mt-5 text-sm text-zinc-500">
              Opening dashboard...
            </p>
          </div>
        </div>
      )}

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.045),transparent_42%)]" />

        <div className="relative w-full max-w-[420px]">
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-yellow-400">
              Maya Burger
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Sign in to access the management system.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2.5 block text-sm font-medium text-zinc-300"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  autoComplete="username"
                  placeholder="Enter your username"
                  disabled={loading || redirecting}
                  required
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2.5 block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    disabled={loading || redirecting}
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20 focus:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    disabled={loading || redirecting}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300 disabled:pointer-events-none"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3">
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || redirecting}
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-yellow-400 px-4 text-sm font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? (
                  <>
                    <Image
                      src="/images/loader.gif"
                      alt=""
                      width={21}
                      height={21}
                      unoptimized
                    />

                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-600 transition hover:text-zinc-400"
            >
              ← Back to Maya Burger
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}