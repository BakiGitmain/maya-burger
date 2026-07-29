"use client";

import Image from "next/image";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  ChevronRight,
  CircleUserRound,
  Eye,
  EyeOff,
  Gauge,
  Globe2,
  KeyRound,
  LayoutPanelLeft,
  LockKeyhole,
  MonitorCog,
  Palette,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  AdminAccent,
  AdminAppearance,
  AdminDensity,
  AdminRadius,
  AdminSidebarWidth,
  AdminTheme,
  defaultAdminAppearance,
  loadAdminAppearance,
  resetAdminAppearance,
  saveAdminAppearance,
} from "../../../../lib/admin-appearance";

type Admin = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  last_login: string | null;
};

type SettingsSection =
  | "account"
  | "appearance"
  | "security"
  | "website"
  | "system";

const settingsNavigation = [
  {
    id: "account" as const,
    label: "Account",
    description:
      "Profile and login information",
    icon: UserRound,
  },
  {
    id: "appearance" as const,
    label: "Appearance",
    description:
      "Customize your workspace",
    icon: Palette,
  },
  {
    id: "security" as const,
    label: "Security",
    description:
      "Account and session security",
    icon: ShieldCheck,
  },
  {
    id: "website" as const,
    label: "Website",
    description:
      "Public website configuration",
    icon: Globe2,
  },
  {
    id: "system" as const,
    label: "System",
    description:
      "System information",
    icon: MonitorCog,
  },
];

const themeOptions: {
  value: AdminTheme;
  title: string;
  description: string;
  colors: string[];
}[] = [
  {
    value: "midnight",
    title: "Midnight",
    description:
      "Cool dark blue-black",
    colors: [
      "#080b0f",
      "#0b1016",
      "#111820",
    ],
  },
  {
    value: "graphite",
    title: "Graphite",
    description:
      "Neutral professional gray",
    colors: [
      "#0b0b0c",
      "#151516",
      "#202023",
    ],
  },
  {
    value: "blackout",
    title: "Blackout",
    description:
      "Pure minimal black",
    colors: [
      "#000000",
      "#090909",
      "#151515",
    ],
  },
];

const accentOptions: {
  value: AdminAccent;
  title: string;
  color: string;
}[] = [
  {
    value: "maya",
    title: "Maya Yellow",
    color: "#ffb800",
  },
  {
    value: "orange",
    title: "Orange",
    color: "#ff7a1a",
  },
  {
    value: "red",
    title: "Red",
    color: "#ef4444",
  },
  {
    value: "emerald",
    title: "Emerald",
    color: "#10b981",
  },
  {
    value: "blue",
    title: "Blue",
    color: "#3b82f6",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const [section, setSection] =
    useState<SettingsSection>(
      "account"
    );

  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [
    initialAdmin,
    setInitialAdmin,
  ] = useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [
    appearance,
    setAppearance,
  ] =
    useState<AdminAppearance>(
      defaultAdminAppearance
    );

  useEffect(() => {
    const frame =
      requestAnimationFrame(() => {
        setAppearance(
          loadAdminAppearance()
        );
      });

    return () =>
      cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const loadAccount = async () => {
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

        const account =
          data.admin as Admin;

        setAdmin(account);
        setInitialAdmin(account);

        setName(account.name);
        setUsername(
          account.username
        );
        setEmail(account.email);
      } catch (error) {
        console.error(
          "Unable to load settings:",
          error
        );

        setError(
          "Unable to load account settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, [router]);

  const updateAppearance = (
    updates: Partial<AdminAppearance>
  ) => {
    const next = {
      ...appearance,
      ...updates,
    };

    setAppearance(next);
    saveAdminAppearance(next);
  };

  const handleResetAppearance =
    () => {
      const next =
        resetAdminAppearance();

      setAppearance(next);
    };

  const handleAccountSave =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (saving) return;

      setError("");
      setSuccess("");

      if (!name.trim()) {
        setError(
          "Name is required."
        );
        return;
      }

      if (
        username.trim().length <
        3
      ) {
        setError(
          "Username must be at least 3 characters."
        );
        return;
      }

      if (!currentPassword) {
        setError(
          "Enter your current password to save changes."
        );
        return;
      }

      if (
        newPassword &&
        newPassword.length < 8
      ) {
        setError(
          "New password must be at least 8 characters."
        );
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setError(
          "New passwords do not match."
        );
        return;
      }

      setSaving(true);

      try {
        const response =
          await fetch(
            "/backend/api/admin/account",
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body: JSON.stringify({
                name,
                username,
                email,
                currentPassword,
                newPassword,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Unable to update account."
          );
          return;
        }

        setAdmin(data.admin);
        setInitialAdmin(
          data.admin
        );

        setName(data.admin.name);

        setUsername(
          data.admin.username
        );

        setEmail(
          data.admin.email
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        window.dispatchEvent(
          new CustomEvent(
            "maya-admin-account-updated",
            {
              detail: data.admin,
            }
          )
        );

        if (
          data.passwordChanged
        ) {
          setSuccess(
            "Password changed successfully. Redirecting to login..."
          );

          setTimeout(() => {
            router.replace(
              "/admin/login"
            );

            router.refresh();
          }, 900);

          return;
        }

        setSuccess(
          "Account updated successfully."
        );
      } catch (error) {
        console.error(
          "Account update error:",
          error
        );

        setError(
          "Unable to connect to the server."
        );
      } finally {
        setSaving(false);
      }
    };

  const roleLabel = (
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

  const accountChanged =
    initialAdmin !== null &&
    (name !==
      initialAdmin.name ||
      username !==
        initialAdmin.username ||
      email !==
        initialAdmin.email ||
      newPassword.length > 0);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Image
          src="/images/loader.gif"
          alt="Loading settings"
          width={48}
          height={48}
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mb-8">
        <p
          className="text-xs font-medium uppercase tracking-[0.2em]"
          style={{
            color:
              "var(--admin-accent)",
          }}
        >
          Configuration
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Configure your account,
          appearance and management
          system preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-[96px] lg:block lg:space-y-1 lg:overflow-visible">
            {settingsNavigation.map(
              (item) => {
                const Icon =
                  item.icon;

                const active =
                  section === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSection(
                        item.id
                      );

                      setError("");
                      setSuccess("");
                    }}
                    style={
                      active
                        ? {
                            backgroundColor:
                              "var(--admin-accent-soft)",
                            borderColor:
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
                      flex min-w-max
                      items-center gap-3
                      border border-transparent
                      px-4 py-3 text-left
                      text-zinc-500
                      transition
                      hover:bg-[var(--admin-hover)]
                      hover:text-zinc-300
                      lg:w-full
                    "
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.035]"
                      style={{
                        borderRadius:
                          "var(--admin-radius)",
                        color: active
                          ? "var(--admin-accent)"
                          : undefined,
                      }}
                    >
                      <Icon
                        size={17}
                      />
                    </div>

                    <div className="hidden min-w-0 lg:block">
                      <p
                        className="text-sm font-medium"
                        style={
                          active
                            ? {
                                color:
                                  "var(--admin-accent)",
                              }
                            : undefined
                        }
                      >
                        {
                          item.label
                        }
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-zinc-600">
                        {
                          item.description
                        }
                      </p>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </aside>

        <div className="min-w-0">
          {section ===
            "account" && (
            <AccountSettings
              admin={admin}
              name={name}
              setName={setName}
              username={
                username
              }
              setUsername={
                setUsername
              }
              email={email}
              setEmail={setEmail}
              currentPassword={
                currentPassword
              }
              setCurrentPassword={
                setCurrentPassword
              }
              newPassword={
                newPassword
              }
              setNewPassword={
                setNewPassword
              }
              confirmPassword={
                confirmPassword
              }
              setConfirmPassword={
                setConfirmPassword
              }
              showCurrentPassword={
                showCurrentPassword
              }
              setShowCurrentPassword={
                setShowCurrentPassword
              }
              showNewPassword={
                showNewPassword
              }
              setShowNewPassword={
                setShowNewPassword
              }
              saving={saving}
              error={error}
              success={
                success
              }
              accountChanged={
                accountChanged
              }
              roleLabel={
                roleLabel
              }
              onSubmit={
                handleAccountSave
              }
            />
          )}

          {section ===
            "appearance" && (
            <AppearanceSettings
              appearance={
                appearance
              }
              updateAppearance={
                updateAppearance
              }
              onReset={
                handleResetAppearance
              }
            />
          )}

          {section ===
            "security" && (
            <SimpleCard
              icon={
                ShieldCheck
              }
              title="Security"
              description="Security information for your administrator account."
            >
              <SettingRow
                icon={
                  LockKeyhole
                }
                title="Authentication"
                description="Signed HTTP-only authentication cookie."
                value="Protected"
              />

              <SettingRow
                icon={UserRound}
                title="Role"
                description="Current administrator permission level."
                value={roleLabel(
                  admin?.role
                )}
              />

              <SettingRow
                icon={KeyRound}
                title="Password storage"
                description="Passwords are protected using bcrypt hashing."
                value="bcrypt"
              />
            </SimpleCard>
          )}

          {section ===
            "website" && (
            <SimpleCard
              icon={Globe2}
              title="Website"
              description="Website configuration will connect to your CMS."
            >
              <SettingRow
                icon={Globe2}
                title="Website identity"
                description="Logo, name and public metadata."
                value="CMS"
              />

              <SettingRow
                icon={
                  MonitorCog
                }
                title="Business information"
                description="Contact information, location and business hours."
                value="CMS"
              />
            </SimpleCard>
          )}

          {section ===
            "system" && (
            <SimpleCard
              icon={
                MonitorCog
              }
              title="System"
              description="Current Maya Burger management infrastructure."
            >
              <SettingRow
                icon={
                  MonitorCog
                }
                title="Backend"
                description="Express API deployment."
                value="Vercel"
              />

              <SettingRow
                icon={Globe2}
                title="Database"
                description="Cloud PostgreSQL database."
                value="Neon"
              />

              <SettingRow
                icon={
                  ShieldCheck
                }
                title="Authentication"
                description="JWT administrator authentication."
                value="Active"
              />
            </SimpleCard>
          )}
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings({
  appearance,
  updateAppearance,
  onReset,
}: {
  appearance: AdminAppearance;

  updateAppearance: (
    updates: Partial<AdminAppearance>
  ) => void;

  onReset: () => void;
}) {
  return (
    <div className="space-y-6">
      <SettingsCard
        icon={Palette}
        title="Interface Theme"
        description="Choose the overall visual style of your management system."
      >
        <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
          {themeOptions.map(
            (theme) => {
              const active =
                appearance.theme ===
                theme.value;

              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() =>
                    updateAppearance({
                      theme:
                        theme.value,
                    })
                  }
                  className="relative overflow-hidden border p-3 text-left transition"
                  style={{
                    borderRadius:
                      "var(--admin-radius)",
                    borderColor:
                      active
                        ? "var(--admin-accent)"
                        : "var(--admin-border)",
                    backgroundColor:
                      active
                        ? "var(--admin-accent-soft)"
                        : "transparent",
                  }}
                >
                  <div className="mb-4 flex h-20 overflow-hidden rounded-lg border border-white/[0.06]">
                    <div
                      className="w-[28%]"
                      style={{
                        backgroundColor:
                          theme
                            .colors[1],
                      }}
                    />

                    <div
                      className="flex-1 p-2"
                      style={{
                        backgroundColor:
                          theme
                            .colors[0],
                      }}
                    >
                      <div
                        className="mb-2 h-2 w-2/3 rounded-full"
                        style={{
                          backgroundColor:
                            theme
                              .colors[2],
                        }}
                      />

                      <div
                        className="h-8 rounded-md"
                        style={{
                          backgroundColor:
                            theme
                              .colors[1],
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {
                          theme.title
                        }
                      </p>

                      <p className="mt-1 text-[11px] text-zinc-600">
                        {
                          theme.description
                        }
                      </p>
                    </div>

                    {active && (
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{
                          backgroundColor:
                            "var(--admin-accent)",
                          color:
                            "#000",
                        }}
                      >
                        <Check
                          size={14}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            }
          )}
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Sparkles}
        title="Accent Color"
        description="Change highlights, active navigation and primary interface actions."
      >
        <div className="flex flex-wrap gap-3 p-5 sm:p-6">
          {accentOptions.map(
            (accent) => {
              const active =
                appearance.accent ===
                accent.value;

              return (
                <button
                  key={
                    accent.value
                  }
                  type="button"
                  onClick={() =>
                    updateAppearance({
                      accent:
                        accent.value,
                    })
                  }
                  className="flex min-w-[130px] items-center gap-3 border px-3 py-3 text-left transition"
                  style={{
                    borderRadius:
                      "var(--admin-radius)",
                    borderColor:
                      active
                        ? accent.color
                        : "var(--admin-border)",
                    backgroundColor:
                      active
                        ? `${accent.color}14`
                        : "transparent",
                  }}
                >
                  <span
                    className="h-7 w-7 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        accent.color,
                      boxShadow:
                        active
                          ? `0 0 0 4px ${accent.color}20`
                          : undefined,
                    }}
                  />

                  <span className="text-xs font-medium text-zinc-300">
                    {accent.title}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Gauge}
        title="Interface Density"
        description="Control how much information fits on screen."
      >
        <OptionSelector<AdminDensity>
          value={
            appearance.density
          }
          options={[
            {
              value:
                "comfortable",
              title:
                "Comfortable",
              description:
                "More spacing and breathing room",
            },
            {
              value:
                "compact",
              title: "Compact",
              description:
                "Fits more information on screen",
            },
          ]}
          onChange={(value) =>
            updateAppearance({
              density: value,
            })
          }
        />
      </SettingsCard>

      <SettingsCard
        icon={LayoutPanelLeft}
        title="Sidebar"
        description="Choose how much horizontal space the navigation uses."
      >
        <OptionSelector<AdminSidebarWidth>
          value={
            appearance.sidebarWidth
          }
          options={[
            {
              value:
                "standard",
              title: "Standard",
              description:
                "270px navigation width",
            },
            {
              value: "wide",
              title: "Wide",
              description:
                "More room for navigation labels",
            },
          ]}
          onChange={(value) =>
            updateAppearance({
              sidebarWidth:
                value,
            })
          }
        />
      </SettingsCard>

      <SettingsCard
        icon={Sparkles}
        title="Corner Style"
        description="Control the shape of cards, controls and navigation."
      >
        <OptionSelector<AdminRadius>
          value={
            appearance.radius
          }
          options={[
            {
              value:
                "rounded",
              title: "Rounded",
              description:
                "Modern soft corners",
            },
            {
              value: "soft",
              title: "Soft",
              description:
                "Balanced professional corners",
            },
            {
              value: "sharp",
              title: "Sharp",
              description:
                "Minimal precise corners",
            },
          ]}
          onChange={(value) =>
            updateAppearance({
              radius: value,
            })
          }
        />
      </SettingsCard>

      <SettingsCard
        icon={Sparkles}
        title="Motion"
        description="Control interface animation behavior."
      >
        <ToggleRow
          title="Reduce motion"
          description="Minimize transitions and interface animations."
          checked={
            appearance.reducedMotion
          }
          onChange={(value) =>
            updateAppearance({
              reducedMotion:
                value,
            })
          }
        />
      </SettingsCard>

      <div className="flex flex-col gap-3 border-t border-[var(--admin-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-600">
          Appearance preferences are
          saved automatically on this
          browser.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="flex h-10 items-center justify-center gap-2 border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 text-xs font-medium text-zinc-300 transition hover:bg-[var(--admin-hover)]"
          style={{
            borderRadius:
              "var(--admin-radius)",
          }}
        >
          <RotateCcw size={14} />

          Reset appearance
        </button>
      </div>
    </div>
  );
}

function AccountSettings({
  admin,
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  saving,
  error,
  success,
  accountChanged,
  roleLabel,
  onSubmit,
}: {
  admin: Admin | null;
  name: string;
  setName: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  currentPassword: string;
  setCurrentPassword: (
    v: string
  ) => void;
  newPassword: string;
  setNewPassword: (
    v: string
  ) => void;
  confirmPassword: string;
  setConfirmPassword: (
    v: string
  ) => void;
  showCurrentPassword: boolean;
  setShowCurrentPassword: (
    v: boolean
  ) => void;
  showNewPassword: boolean;
  setShowNewPassword: (
    v: boolean
  ) => void;
  saving: boolean;
  error: string;
  success: string;
  accountChanged: boolean;
  roleLabel: (
    role?: string
  ) => string;
  onSubmit: (
    e: FormEvent<HTMLFormElement>
  ) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <SettingsCard
        icon={CircleUserRound}
        title="Account Information"
        description="Your administrator profile and login identity."
      >
        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <SettingsInput
            label="Full name"
            value={name}
            onChange={setName}
          />

          <SettingsInput
            label="Username"
            value={username}
            onChange={
              setUsername
            }
          />

          <SettingsInput
            label="Email address"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Role
            </label>

            <div className="flex h-11 items-center border border-[var(--admin-border)] bg-white/[0.02] px-3.5"
              style={{
                borderRadius:
                  "var(--admin-radius)",
              }}
            >
              <LockKeyhole
                size={15}
                className="mr-2.5 text-zinc-600"
              />

              <span className="text-sm text-zinc-500">
                {roleLabel(
                  admin?.role
                )}
              </span>

              <span
                className="ml-auto px-2 py-1 text-[10px] font-medium"
                style={{
                  color:
                    "var(--admin-accent)",
                  backgroundColor:
                    "var(--admin-accent-soft)",
                  borderRadius:
                    "6px",
                }}
              >
                Protected
              </span>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={KeyRound}
        title="Login & Password"
        description="Verify your password before saving sensitive account changes."
      >
        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <PasswordInput
            label="Current password"
            value={
              currentPassword
            }
            onChange={
              setCurrentPassword
            }
            show={
              showCurrentPassword
            }
            onToggle={() =>
              setShowCurrentPassword(
                !showCurrentPassword
              )
            }
          />

          <div className="hidden sm:block" />

          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={
              setNewPassword
            }
            show={
              showNewPassword
            }
            onToggle={() =>
              setShowNewPassword(
                !showNewPassword
              )
            }
          />

          <PasswordInput
            label="Confirm new password"
            value={
              confirmPassword
            }
            onChange={
              setConfirmPassword
            }
            show={
              showNewPassword
            }
            onToggle={() =>
              setShowNewPassword(
                !showNewPassword
              )
            }
          />
        </div>
      </SettingsCard>

      {error && (
        <div className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-3 text-sm text-emerald-400">
          <Check size={16} />
          {success}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            saving ||
            !accountChanged
          }
          style={{
            backgroundColor:
              "var(--admin-accent)",
            borderRadius:
              "var(--admin-radius)",
          }}
          className="flex h-11 min-w-[150px] items-center justify-center gap-2 px-5 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? (
            <>
              <Image
                src="/images/loader.gif"
                alt=""
                width={18}
                height={18}
                unoptimized
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="overflow-hidden border border-[var(--admin-border)] bg-[var(--admin-panel)]"
      style={{
        borderRadius:
          "var(--admin-radius)",
      }}
    >
      <div className="border-b border-[var(--admin-border)] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{
              borderRadius:
                "var(--admin-radius)",
              backgroundColor:
                "var(--admin-accent-soft)",
              color:
                "var(--admin-accent)",
            }}
          >
            <Icon size={18} />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-zinc-600">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

function SimpleCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <SettingsCard
      icon={icon}
      title={title}
      description={description}
    >
      <div className="divide-y divide-white/[0.06]">
        {children}
      </div>
    </SettingsCard>
  );
}

function OptionSelector<
  T extends string,
>({
  value,
  options,
  onChange,
}: {
  value: T;

  options: {
    value: T;
    title: string;
    description: string;
  }[];

  onChange: (
    value: T
  ) => void;
}) {
  return (
    <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
      {options.map(
        (option) => {
          const active =
            value ===
            option.value;

          return (
            <button
              key={
                option.value
              }
              type="button"
              onClick={() =>
                onChange(
                  option.value
                )
              }
              className="flex items-center justify-between gap-4 border p-4 text-left transition"
              style={{
                borderRadius:
                  "var(--admin-radius)",
                borderColor:
                  active
                    ? "var(--admin-accent)"
                    : "var(--admin-border)",
                backgroundColor:
                  active
                    ? "var(--admin-accent-soft)"
                    : "transparent",
              }}
            >
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {
                    option.title
                  }
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  {
                    option.description
                  }
                </p>
              </div>

              {active && (
                <Check
                  size={17}
                  style={{
                    color:
                      "var(--admin-accent)",
                  }}
                />
              )}
            </button>
          );
        }
      )}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (
    value: boolean
  ) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5 sm:p-6">
      <div>
        <p className="text-sm font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange(!checked)
        }
        className="relative h-6 w-11 shrink-0 rounded-full transition"
        style={{
          backgroundColor:
            checked
              ? "var(--admin-accent)"
              : "rgba(255,255,255,.09)",
        }}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="h-11 w-full border border-[var(--admin-border)] bg-white/[0.025] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:bg-white/[0.04]"
        style={{
          borderRadius:
            "var(--admin-radius)",
        }}
      />
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  show,
  onToggle,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </label>

      <div className="relative">
        <input
          type={
            show
              ? "text"
              : "password"
          }
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="h-11 w-full border border-[var(--admin-border)] bg-white/[0.025] px-3.5 pr-11 text-sm text-white outline-none"
          style={{
            borderRadius:
              "var(--admin-radius)",
          }}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300"
        >
          {show ? (
            <EyeOff
              size={16}
            />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  value,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center bg-white/[0.035] text-zinc-500"
        style={{
          borderRadius:
            "var(--admin-radius)",
        }}
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-zinc-500 sm:block">
          {value}
        </span>

        <ChevronRight
          size={15}
          className="text-zinc-700"
        />
      </div>
    </div>
  );
}