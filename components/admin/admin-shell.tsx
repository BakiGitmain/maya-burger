"use client";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  BarChart3,
  ChevronDown,
  CircleUserRound,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  applyAdminAppearance,
  loadAdminAppearance,
} from "../../lib/admin-appearance";

type Admin = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  last_login: string | null;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const mainNavigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Menu",
    href: "/admin/menu",
    icon: FileText,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "System Management",
    href: "/admin/system",
    icon: ShieldCheck,
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const accountRef =
    useRef<HTMLDivElement>(null);

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [
    checkingSession,
    setCheckingSession,
  ] = useState(true);

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    accountOpen,
    setAccountOpen,
  ] = useState(false);

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  useEffect(() => {
    applyAdminAppearance(
      loadAdminAppearance()
    );
  }, []);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await fetch(
          "/backend/api/admin/me",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          router.replace(
            "/admin/login"
          );
          return;
        }

        const data =
          await response.json();

        setAdmin(data.admin);
      } catch (error) {
        console.error(
          "Unable to load admin:",
          error
        );

        router.replace(
          "/admin/login"
        );
      } finally {
        setCheckingSession(false);
      }
    };

    loadAdmin();
  }, [router]);

  useEffect(() => {
    const handleAccountUpdated = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<Admin>;

      setAdmin(customEvent.detail);
    };

    window.addEventListener(
      "maya-admin-account-updated",
      handleAccountUpdated
    );

    return () => {
      window.removeEventListener(
        "maya-admin-account-updated",
        handleAccountUpdated
      );
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(
          event.target as Node
        )
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [sidebarOpen]);

  const closeNavigation = () => {
    setSidebarOpen(false);
    setAccountOpen(false);
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch(
        "/backend/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      router.replace(
        "/admin/login"
      );

      router.refresh();
    }
  };

  const isActive = (
    href: string
  ) =>
    pathname === href ||
    pathname.startsWith(
      `${href}/`
    );

  const formatRole = (
    role?: string
  ) => {
    if (!role) return "Admin";

    return role
      .split("_")
      .map(
        (word) =>
          word
            .charAt(0)
            .toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--admin-bg,#080b0f)]">
        <div className="flex flex-col items-center">
          <Image
            src="/images/loader.gif"
            alt="Loading"
            width={56}
            height={56}
            unoptimized
            priority
          />

          <p className="mt-4 text-sm text-zinc-500">
            Loading management
            system...
          </p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-white">
      <style>
        {`
          html[data-admin-reduced-motion="true"] *,
          html[data-admin-reduced-motion="true"] *::before,
          html[data-admin-reduced-motion="true"] *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
          }
        `}
      </style>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        style={{
          width:
            "var(--admin-sidebar-width)",
        }}
        className={`
          fixed bottom-0 left-0 top-0 z-50
          flex flex-col
          border-r border-[var(--admin-border)]
          bg-[var(--admin-sidebar)]
          transition-transform duration-300 ease-out
          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-[var(--admin-border)] px-5">
          <Link
            href="/admin/dashboard"
            onClick={closeNavigation}
            className="flex items-center gap-3"
          >
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/images/maya_logo.png"
                alt="Maya Burger"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <p className="text-[16px] font-semibold tracking-[-0.02em] text-white">
                Maya Burger
              </p>

              <p
                className="mt-1 text-sm font-semibold"
                style={{
                  color:
                    "var(--admin-accent)",
                }}
              >
                Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">
          <nav className="space-y-1.5">
            {mainNavigation.map(
              (item) => {
                const Icon =
                  item.icon;

                const active =
                  isActive(
                    item.href
                  );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={
                      closeNavigation
                    }
                    style={
                      active
                        ? {
                            backgroundColor:
                              "var(--admin-accent-soft)",
                            color:
                              "var(--admin-accent)",
                            borderRadius:
                              "var(--admin-radius)",
                          }
                        : {
                            borderRadius:
                              "var(--admin-radius)",
                          }
                    }
                    className="
                      group relative flex
                      h-[var(--admin-nav-height)]
                      items-center gap-3.5
                      px-3.5 text-[14px]
                      font-medium text-zinc-400
                      transition-all duration-200
                      hover:bg-[var(--admin-hover)]
                      hover:text-zinc-100
                    "
                  >
                    {active && (
                      <span
                        className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full"
                        style={{
                          backgroundColor:
                            "var(--admin-accent)",
                        }}
                      />
                    )}

                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      style={
                        active
                          ? {
                              color:
                                "var(--admin-accent)",
                            }
                          : undefined
                      }
                      className="text-zinc-500 transition-colors group-hover:text-zinc-300"
                    />

                    <span>
                      {item.label}
                    </span>
                  </Link>
                );
              }
            )}
          </nav>
        </div>

        <div className="shrink-0 border-t border-[var(--admin-border)] p-4">
          <div
            className="border border-[var(--admin-border)] bg-[var(--admin-panel)] p-4"
            style={{
              borderRadius:
                "var(--admin-radius)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center"
                style={{
                  borderRadius:
                    "var(--admin-radius)",
                  backgroundColor:
                    "var(--admin-accent-soft)",
                  color:
                    "var(--admin-accent)",
                }}
              >
                <ShieldCheck
                  size={18}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-200">
                  {admin.name}
                </p>

                <p className="mt-0.5 truncate text-xs text-zinc-600">
                  {formatRole(
                    admin.role
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[var(--admin-sidebar-width)]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-bg)]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-[var(--admin-border)] bg-[var(--admin-panel)] text-zinc-300 transition hover:bg-[var(--admin-hover)] lg:hidden"
              style={{
                borderRadius:
                  "var(--admin-radius)",
              }}
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-sm font-semibold text-zinc-100 sm:text-[15px]">
                Management System
              </p>

              <p className="hidden text-xs text-zinc-600 sm:block">
                Maya Burger
                administration
              </p>
            </div>
          </div>

          <div
            ref={accountRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setAccountOpen(
                  (current) =>
                    !current
                )
              }
              style={{
                borderRadius:
                  "var(--admin-radius)",
              }}
              className={`
                flex items-center gap-3
                border px-3 py-2
                text-left transition

                ${
                  accountOpen
                    ? "border-[var(--admin-border)] bg-[var(--admin-panel)]"
                    : "border-transparent hover:border-[var(--admin-border)] hover:bg-[var(--admin-panel)]"
                }
              `}
            >
              <div className="hidden min-w-0 sm:block">
                <p className="max-w-[150px] truncate text-sm font-medium text-white">
                  {admin.name}
                </p>

                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {formatRole(
                    admin.role
                  )}
                </p>
              </div>

              <CircleUserRound
                size={22}
                strokeWidth={1.7}
                className="text-zinc-400 sm:hidden"
              />

              <ChevronDown
                size={16}
                className={`text-zinc-500 transition-transform duration-200 ${
                  accountOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {accountOpen && (
              <div
                className="absolute right-0 top-[calc(100%+10px)] w-[290px] overflow-hidden border border-[var(--admin-border)] bg-[var(--admin-elevated)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                style={{
                  borderRadius:
                    "var(--admin-radius)",
                }}
              >
                <div className="border-b border-[var(--admin-border)] p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold uppercase"
                      style={{
                        borderRadius:
                          "var(--admin-radius)",
                        backgroundColor:
                          "var(--admin-accent-soft)",
                        color:
                          "var(--admin-accent)",
                      }}
                    >
                      {admin.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {admin.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-zinc-500">
                        @{admin.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 px-4 py-4">
                  <AccountInformation
                    label="Email"
                    value={
                      admin.email
                    }
                  />

                  <AccountInformation
                    label="Role"
                    value={formatRole(
                      admin.role
                    )}
                  />

                  <AccountInformation
                    label="Account"
                    value="Active"
                    active
                  />
                </div>

                <div className="border-t border-[var(--admin-border)] p-2">
                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    disabled={
                      loggingOut
                    }
                    className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/[0.08] hover:text-red-300 disabled:pointer-events-none disabled:opacity-50"
                    style={{
                      borderRadius:
                        "var(--admin-radius)",
                    }}
                  >
                    {loggingOut ? (
                      <>
                        <Image
                          src="/images/loader.gif"
                          alt=""
                          width={18}
                          height={18}
                          unoptimized
                        />

                        Signing out...
                      </>
                    ) : (
                      <>
                        <LogOut
                          size={17}
                        />
                        Sign out
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)] p-[var(--admin-content-padding)]">
          <div className="mx-auto w-full max-w-[1700px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function AccountInformation({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-zinc-600">
        {label}
      </span>

      <div className="flex min-w-0 items-center gap-2">
        {active && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
        )}

        <span
          className={`truncate text-xs ${
            active
              ? "text-emerald-400"
              : "text-zinc-300"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}