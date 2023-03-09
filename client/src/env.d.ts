/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCALHOST: string;
  readonly VITE_RENDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
