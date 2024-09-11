/// < reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: string
    readonly VITE_DOMAIN: string
    readonly VITE_API_DEV_URL: string
    readonly VITE_API_PROD_URL: string
    readonly VITE_API_MAX_TEAM_ID: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}