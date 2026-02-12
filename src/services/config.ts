// src/services/config.ts

const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined || value === "") {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  apiBaseUrl: getEnv("VITE_API_BASE_URL", ""),
  useMock: getEnv("VITE_USE_MOCK", "false") === "true",
};
