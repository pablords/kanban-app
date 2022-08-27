import { BaseServiceMethods } from "../../common/base.interface"
import { BaseService } from "../../common/base.service"
import { Card } from "../card.entity"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"
import { CardRepository } from "../repository/card.repository"
import { CardServiceMethods } from "./services.interface"

export class CardService extends BaseService implements CardServiceMethods {
  constructor (protected repository: CardRepository) {
    super(repository)
  }

  async createCard (data: CreateCardDto): Promise<Card | Card[]> {
    return await this.repository.create(data)
  }

  async findAllCards (): Promise<Card[]> {
    return await this.repository.find()
  }

  async findOneCard (id: string): Promise<Card> {
    const card = await this.repository.findOne(id)
    if (!card) {
      // @todo
    }
    return card
  }

  async updateCard (data: UpdateCardDto): Promise<boolean> {
    const cardExists = await this.findOneCard(data.id)
    if (!cardExists) {
      // @todo
    }
    const cardIsUpdated = await this.repository.update(data)
    if (!cardIsUpdated) {
      // @todo
    }
    return true
  }

  async deleteCard (id: string): Promise<boolean> {
    const cardExists = await this.findOneCard(id)
    if (!cardExists) {
      // @todo
    }
    const cardIsDeleted = await this.repository.delete(id)
    if (!cardIsDeleted) {
      // @todo
    }
    return true
  }
}
