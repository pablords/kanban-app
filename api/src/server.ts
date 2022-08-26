import "dotenv/config"
import express from "express"
import cors from "cors"
import os from "os"
import cluster from "cluster"
import { logger } from "./config/logger"
import http from "http"

const numCPUS = os.cpus().length

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUS; i += 2) {
    cluster.fork()
  }
  cluster.on("exit", (worker, code, signal) => {
    logger.error(`worker ${worker.process.pid} died`)
  })
  logger.info(`Master ${process.pid} is running`)
} else {
  const app = express()
  const server = http.createServer(app)
  app.use(cors())
  app.use(express.json())
  server.listen(process.env.PORT, () => {
    logger.info(
            `Server is running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`
    )
  })
  logger.info(`Worker ${process.pid} started`)
}
