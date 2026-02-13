/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_AWS_REGION: string
  readonly VITE_S3_BUCKET: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
