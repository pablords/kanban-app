import { logger } from "@/config/logger"
import { NextFunction, Request, Response } from "express"
import { format } from "date-fns"

class OutReportLogMiddleware {
  async execute (req: Request, res: Response, next: NextFunction) {
    const oldWrite = res.write
    const oldEnd = res.end

    const chunks = []

    res.write = (chunk: any, ...args: any) => {
      chunks.push(chunk)
      return oldWrite.apply(res, [chunk, ...args])
    }

    res.end = (chunk: any, ...args: any) => {
      if (chunk) {
        chunks.push(chunk)
      }
      const body = Buffer.concat(chunks).toString("utf8")
      const data = JSON.parse(body)
      const date = new Date()

      if (!data.httpCode) {
        if (req.method == "PUT") {
          logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Card ${data.id} - ${data.title} - Alterado`)
          next()
        } else if (req.method == "DELETE") {
          logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Card ${req.params.id} - Removido`)
          next()
        }
      } else {
        if (req.method == "PUT") {
          logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Erro ao Alterar - Card ${req.params.id} - ${req.body.title}`)
          next()
        } else if (req.method == "DELETE") {
          logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Erro ao Remover Card ${req.params.id}`)
          next()
        }
      }

      return oldEnd.apply(res, [chunk, ...args])
    }

    next()
  }
}

export default new OutReportLogMiddleware()
