import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import errorHandlerMiddleware from "@/app/middlewares/error-handler.middleware"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

class AuthMiddleware {
  async execute (req: Request, res: Response, next: NextFunction) {
    let token
    try {
      if (req.headers.authorization) {
        token = req.headers?.authorization?.split(" ")[1]
      } else {
        token = req.headers.token
      }
      if (!token) {
        throw new APIError("UNAUTHORIZED",
          HttpStatusCode.UNAUTHORIZED,
          true,
          businessError.TOKEN_NOT_FOUND
        )
      }
      jwt.verify(String(token), process.env.SECRET_API, function (err, decoded) {
        if (err) {
          throw new APIError("UNAUTHORIZED",
            HttpStatusCode.UNAUTHORIZED,
            true,
            businessError.TOKEN_NOT_FOUND
          )
        }
        next()
      })
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new AuthMiddleware()
