import { BaseController } from "../../common/base.controller"
import { CardControllerMethods } from "./card-controller.interface"
import { CardServiceMethods } from "../services/services.interface"
import { Card } from "../card.entity"
import { NextFunction, Request, Response } from "express"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"
import errorHandlerMiddleware from "../../../middlewares/error-handler"
import { inject } from "inversify"
import { httpGet, httpPost, BaseHttpController, interfaces, controller, httpPut, httpDelete } from "inversify-express-utils"
import TYPES from "@/app/modules/common/types"

@controller('')
export class CardController extends BaseHttpController implements CardControllerMethods {
  private _cardService: CardServiceMethods;

  constructor (
        @inject(TYPES.CardServiceInterface) cardService: CardServiceMethods
  ) {
    super()

    this._cardService = cardService
  }

  @httpGet('/cards')
  async getAllCards (req: Request, res: Response): Promise<Response<Card[]>> {
    const cards = await this._cardService.findAllCards()
    return res.json(cards)
  }

  @httpPost('/cards')
  async createCard (req: Request, res: Response, next: NextFunction): Promise<Response<Card>> {
    try {
      const card = await this._cardService.createCard(req.body)
      return res.json(card)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpGet('/cards/:id')
  async getOneCard (req: Request, res: Response, next: NextFunction): Promise<Response<Card>> {
    try {
      const card = await this._cardService.findOneCard(req.params.id)
      return res.json(card)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpPut('/cards/:id')
  async updateCard (req: Request, res: Response, next: NextFunction): Promise<Response<boolean>> {
    try {
      const updatedDto: UpdateCardDto = {
        ...req.body,
        id: req.params.id

      }
      const isUpdated = await this._cardService.updateCard(updatedDto)
      return res.json(isUpdated)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }

  @httpDelete('/cards/:id')
  async deleteCard (req: Request, res: Response, next: NextFunction): Promise<Response<boolean>> {
    try {
      const isDeleted = await this._cardService.deleteCard(req.params.id)
      return res.json(isDeleted)
    } catch (error) {
      return errorHandlerMiddleware.returnError(error, req, res, next)
    }
  }
}
