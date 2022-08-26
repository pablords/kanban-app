declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test"
        APP_PORT?: number
        APP_HOST: string
        DB_ENGINE: "mysql"
        DB_HOST: string
        DB_PORT: number
        DB_USER: string
        DB_DATABASE: string
        DB_PASSWORD: string
        DB_LOGGING: boolean | "all" | Array<("query" | "schema" | "error" | "warn" | "info" | "log" | "migration")>
        TIMEZONE: string
      }
    }
  }
export { }
