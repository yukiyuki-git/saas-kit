// Simple feature flag system
// In production, use a service like LaunchDarkly or Flagsmith

export type FeatureFlag =
  | "dark_mode"
  | "two_factor_auth"
  | "team_invitations"
  | "api_keys"
  | "webhooks"
  | "advanced_analytics"
  | "file_uploads"
  | "blog"
  | "i18n"
  | "command_palette"
  | "notifications"
  | "audit_logs"
  | "beta_features";

const defaultFlags: Record<FeatureFlag, boolean> = {
  dark_mode: true,
  two_factor_auth: true,
  team_invitations: true,
  api_keys: true,
  webhooks: true,
  advanced_analytics: true,
  file_uploads: false, // Beta
  blog: true,
  i18n: true,
  command_palette: true,
  notifications: true,
  audit_logs: true,
  beta_features: false,
};

// Override flags via environment variables
function getEnvFlag(flag: FeatureFlag): boolean | null {
  const envKey = `FEATURE_${flag.toUpperCase()}`;
  const value = process.env[envKey];
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

export function isEnabled(flag: FeatureFlag): boolean {
  const envOverride = getEnvFlag(flag);
  if (envOverride !== null) return envOverride;
  return defaultFlags[flag] ?? false;
}

export function getAllFlags(): Record<FeatureFlag, boolean> {
  const flags = { ...defaultFlags };
  for (const flag of Object.keys(flags) as FeatureFlag[]) {
    const envOverride = getEnvFlag(flag);
    if (envOverride !== null) {
      flags[flag] = envOverride;
    }
  }
  return flags;
}

export function enabledFlags(): FeatureFlag[] {
  return Object.entries(getAllFlags())
    .filter(([, enabled]) => enabled)
    .map(([flag]) => flag as FeatureFlag);
}
