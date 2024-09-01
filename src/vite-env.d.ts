/// < reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string
    readonly VITE_DOMAIN: string
    readonly VITE_NODE_ENV: string
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}