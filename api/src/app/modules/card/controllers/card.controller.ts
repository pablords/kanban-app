import { BaseController } from "../../common/base.controller"
import { CardControllerMethods } from "./card-controller.interface"
import { CardServiceMethods } from "../services/services.interface"
import { Card } from "../card.entity"
import { Request, Response } from "express"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"

export class CardController extends BaseController implements CardControllerMethods {
  constructor (protected service: CardServiceMethods) {
    super(service)
  }

  async createCard (req: Request<CreateCardDto>, res: Response): Promise<Response<Card>> {
    const card = await this.service.createCard(req.body)
    return res.json(card)
  }

  async getAllCards (req: Request, res: Response): Promise<Response<Card[]>> {
    const cards = await this.service.findAllCards()
    return res.json(cards)
  }

  async getOneCard (req: Request, res: Response): Promise<Response<Card>> {
    const card = await this.service.findOneCard(req.params.id)
    return res.json(card)
  }

  async updateCard (req: Request<UpdateCardDto>, res: Response): Promise<Response<boolean>> {
    const isUpdated = await this.service.updateCard(req.body)
    return res.json(isUpdated)
  }

  async deleteCard (req: Request, res: Response): Promise<Response<boolean>> {
    const isDeleted = await this.service.deleteCard(req.params.id)
    return res.json(isDeleted)
  }
}
