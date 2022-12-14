import "reflect-metadata"
import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { BaseService } from "../../common/base.service"
import { Card } from "../card.entity"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"
import { CardRepositoryMethods } from "../repository/card-repository.interface"
import { CardServiceMethods } from "./services.interface"
import { injectable, inject } from "inversify"
import TYPES from "@/app/modules/common/types"

@injectable()
export class CardService extends BaseService implements CardServiceMethods {
  private _cardRepository: CardRepositoryMethods;

  constructor (
        @inject(TYPES.CardRepositoryInterface) cardRepository: CardRepositoryMethods
  ) {
    super(cardRepository)
    this._cardRepository = cardRepository
  }

  async createCard (data: CreateCardDto): Promise<Card | Card[]> {
    const card = await this._cardRepository.create(data)
    if (!card) {
      throw new APIError("UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    }
    return card
  }

  async findAllCards (): Promise<Card[]> {
    const cards = await this._cardRepository.find()
    if (!cards.length) {
      throw new APIError("NOT_FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        businessError.ENTITY_NOT_FOUND,
        undefined
      )
    }
    return cards
  }

  async findOneCard (id: string): Promise<Card> {
    const card = await this._cardRepository.findOne(id)
    if (!card) {
      throw new APIError("NOT_FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        businessError.ENTITY_NOT_FOUND,
        undefined
      )
    }
    return card
  }

  async updateCard (data: UpdateCardDto): Promise<Card> {
    await this.findOneCard(data.id)
    const cardIsUpdated = await this._cardRepository.update(data)
    if (!cardIsUpdated) {
      throw new APIError("UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    }
    const updatedCard = await this.findOneCard(data.id)
    return updatedCard
  }

  async deleteCard (id: string): Promise<Card[]> {
    await this.findOneCard(id)
    const cardIsDeleted = await this._cardRepository.delete(id)
    if (!cardIsDeleted) {
      throw new APIError("UNPROCESSABLE_ENTITY",
        HttpStatusCode.UNPROCESSABLE_ENTITY,
        true,
        businessError.UNPROCESSABLE_ENTITY,
        undefined
      )
    }
    const cards = await this.findAllCards()
    return cards
  }
}
