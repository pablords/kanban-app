import { fieldValidate } from "../data-validate/create-card.validate"
import { NextFunction, Request, Response } from "express"
import { CreateCardDto } from "../dto/create-card.dto"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import errorHandlerMiddleware from "@/app/middlewares/error-handler.middleware"

class ValidateFieldsMiddleware {
  async execute (req: Request, res: Response, next: NextFunction) {
    const data: CreateCardDto = req.body
    const matched = await fieldValidate(data)
    try {
      if (matched) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.BAD_REQUEST,
          matched
        )
      }
      next()
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}

export default new ValidateFieldsMiddleware()
