/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_URL: string;
  readonly VITE_API_KEY: string;
  // add other env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}