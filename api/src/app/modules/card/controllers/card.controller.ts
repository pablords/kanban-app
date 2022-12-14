
import { CardControllerMethods } from "./card-controller.interface"
import { CardServiceMethods } from "../services/services.interface"
import { Card } from "../card.entity"
import { NextFunction, Request, Response } from "express"
import { UpdateCardDto } from "../dto/update-card.dto"
import errorHandlerMiddleware from "../../../middlewares/error-handler.middleware"
import { inject } from "inversify"
import { httpGet, httpPost, BaseHttpController, controller, httpPut, httpDelete } from "inversify-express-utils"
import TYPES from "@/app/modules/common/types"
import InReportMiddleware from "../middlewares/in-report.middleware"
import OutReportLogMiddleware from "../middlewares/out-report.middleware"
import ValidateFieldsMiddleware from "../middlewares/validate-fields.middleware"
import AuthMiddleware from "@/app/modules/auth/middlewares/auth.middleware"

@controller('')
export class CardController extends BaseHttpController implements CardControllerMethods {
  private _cardService: CardServiceMethods;

  constructor (
        @inject(TYPES.CardServiceInterface) cardService: CardServiceMethods
  ) {
    super()

    this._cardService = cardService
  }

  @httpGet('/cards', AuthMiddleware.execute)
  async getAllCards (req: Request, res: Response, next: NextFunction): Promise<Response<Card[]>> {
    try {
      const cards = await this._cardService.findAllCards()
      return res.json(cards)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpPost('/cards', AuthMiddleware.execute, ValidateFieldsMiddleware.execute)
  async createCard (req: Request, res: Response, next: NextFunction): Promise<Response<Card>> {
    try {
      const card = await this._cardService.createCard(req.body)
      return res.json(card)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpGet('/cards/:id', AuthMiddleware.execute)
  async getOneCard (req: Request, res: Response, next: NextFunction): Promise<Response<Card>> {
    try {
      const card = await this._cardService.findOneCard(req.params.id)
      return res.json(card)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpPut('/cards/:id', AuthMiddleware.execute, InReportMiddleware.execute, OutReportLogMiddleware.execute, ValidateFieldsMiddleware.execute)
  async updateCard (req: Request, res: Response, next: NextFunction): Promise<Response<boolean>> {
    try {
      const updatedDto: UpdateCardDto = {
        ...req.body,
        id: req.params.id

      }
      const card = await this._cardService.updateCard(updatedDto)
      return res.json(card)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpDelete('/cards/:id', AuthMiddleware.execute, InReportMiddleware.execute, OutReportLogMiddleware.execute)
  async deleteCard (req: Request, res: Response, next: NextFunction): Promise<Response<boolean>> {
    try {
      const isDeleted = await this._cardService.deleteCard(req.params.id)
      return res.json(isDeleted)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}
