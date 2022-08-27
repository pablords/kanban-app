import "reflect-metadata"
import { DataSource } from "typeorm"
import "dotenv/config"
import { logger } from "./logger"

declare type LoggerOptions = boolean | "all" | Array<("query" | "schema" | "error" | "warn" | "info" | "log" | "migration")>;

export const connection = new DataSource({
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],
  synchronize: true,
  logging: process.env.DB_LOGGING as LoggerOptions,
  timezone: process.env.TIMEZONE,
  connectTimeout: 10000
})

connection.initialize().then(async (conn) => {
  if (process.env.DB_LOGGING) {
    logger.info(`DB is initialized: ${conn.isInitialized}`)
  }
}).catch((error) => {
  if (process.env.NODE_ENV === "development") {
    logger.error(error)
  }
})

export const entityManager = connection.manager
