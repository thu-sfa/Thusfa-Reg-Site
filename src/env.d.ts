/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_REG_REDIRECT: string;
  readonly VITE_URL_ADMIN_REDIRECT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
