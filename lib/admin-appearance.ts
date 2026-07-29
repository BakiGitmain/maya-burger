export type AdminTheme =
  | "midnight"
  | "graphite"
  | "blackout";

export type AdminAccent =
  | "maya"
  | "orange"
  | "red"
  | "emerald"
  | "blue";

export type AdminDensity =
  | "comfortable"
  | "compact";

export type AdminRadius =
  | "rounded"
  | "soft"
  | "sharp";

export type AdminSidebarWidth =
  | "standard"
  | "wide";

export type AdminAppearance = {
  theme: AdminTheme;
  accent: AdminAccent;
  density: AdminDensity;
  radius: AdminRadius;
  sidebarWidth: AdminSidebarWidth;
  reducedMotion: boolean;
};

export const defaultAdminAppearance: AdminAppearance = {
  theme: "midnight",
  accent: "maya",
  density: "comfortable",
  radius: "rounded",
  sidebarWidth: "standard",
  reducedMotion: false,
};

const STORAGE_KEY =
  "maya-burger-admin-appearance-v1";

const themes = {
  midnight: {
    background: "#080b0f",
    sidebar: "#0b1016",
    panel: "#0d1218",
    elevated: "#111820",
    hover: "#151d26",
    border: "rgba(255,255,255,0.07)",
  },

  graphite: {
    background: "#0b0b0c",
    sidebar: "#101011",
    panel: "#151516",
    elevated: "#1a1a1c",
    hover: "#202023",
    border: "rgba(255,255,255,0.075)",
  },

  blackout: {
    background: "#000000",
    sidebar: "#050505",
    panel: "#090909",
    elevated: "#0f0f0f",
    hover: "#151515",
    border: "rgba(255,255,255,0.08)",
  },
};

const accents = {
  maya: {
    main: "#ffb800",
    hover: "#ffc62b",
    soft: "rgba(255,184,0,0.13)",
  },

  orange: {
    main: "#ff7a1a",
    hover: "#ff913f",
    soft: "rgba(255,122,26,0.13)",
  },

  red: {
    main: "#ef4444",
    hover: "#f35c5c",
    soft: "rgba(239,68,68,0.13)",
  },

  emerald: {
    main: "#10b981",
    hover: "#22c990",
    soft: "rgba(16,185,129,0.13)",
  },

  blue: {
    main: "#3b82f6",
    hover: "#5594f7",
    soft: "rgba(59,130,246,0.13)",
  },
};

export function applyAdminAppearance(
  appearance: AdminAppearance
) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const theme = themes[appearance.theme];
  const accent = accents[appearance.accent];

  root.style.setProperty(
    "--admin-bg",
    theme.background
  );

  root.style.setProperty(
    "--admin-sidebar",
    theme.sidebar
  );

  root.style.setProperty(
    "--admin-panel",
    theme.panel
  );

  root.style.setProperty(
    "--admin-elevated",
    theme.elevated
  );

  root.style.setProperty(
    "--admin-hover",
    theme.hover
  );

  root.style.setProperty(
    "--admin-border",
    theme.border
  );

  root.style.setProperty(
    "--admin-accent",
    accent.main
  );

  root.style.setProperty(
    "--admin-accent-hover",
    accent.hover
  );

  root.style.setProperty(
    "--admin-accent-soft",
    accent.soft
  );

  const radiusMap: Record<
    AdminRadius,
    string
  > = {
    rounded: "16px",
    soft: "10px",
    sharp: "4px",
  };

  root.style.setProperty(
    "--admin-radius",
    radiusMap[appearance.radius]
  );

  const sidebarMap: Record<
    AdminSidebarWidth,
    string
  > = {
    standard: "270px",
    wide: "305px",
  };

  root.style.setProperty(
    "--admin-sidebar-width",
    sidebarMap[appearance.sidebarWidth]
  );

  if (appearance.density === "compact") {
    root.style.setProperty(
      "--admin-nav-height",
      "42px"
    );

    root.style.setProperty(
      "--admin-content-padding",
      "20px"
    );
  } else {
    root.style.setProperty(
      "--admin-nav-height",
      "48px"
    );

    root.style.setProperty(
      "--admin-content-padding",
      "32px"
    );
  }

  if (appearance.reducedMotion) {
    root.dataset.adminReducedMotion =
      "true";
  } else {
    delete root.dataset.adminReducedMotion;
  }
}

export function saveAdminAppearance(
  appearance: AdminAppearance
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(appearance)
  );

  applyAdminAppearance(appearance);
}

export function loadAdminAppearance(): AdminAppearance {
  if (typeof window === "undefined") {
    return defaultAdminAppearance;
  }

  try {
    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return defaultAdminAppearance;
    }

    const parsed = JSON.parse(
      raw
    ) as Partial<AdminAppearance>;

    return {
      ...defaultAdminAppearance,
      ...parsed,
    };
  } catch {
    return defaultAdminAppearance;
  }
}

export function resetAdminAppearance() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(
      STORAGE_KEY
    );
  }

  applyAdminAppearance(
    defaultAdminAppearance
  );

  return defaultAdminAppearance;
}