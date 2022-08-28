import { NextFunction, Request, Response } from "express"
import { format } from "date-fns"
import { logger } from "@/config/logger"

class InReportMiddleware {
  async execute (req: Request, res: Response, next: NextFunction) {
    const data = req?.body
    const date = new Date()
    if (req.method == "PUT") {
      logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Alterando - Card ${req.params.id} - ${data.title}`)
      next()
    } else if (req.method == "DELETE") {
      logger.info(`${format(date, "dd/mm/yyyy HH:mm:ss")} Removendo - Card ${req.params.id}`)
      next()
    }
  }
}

export default new InReportMiddleware()
