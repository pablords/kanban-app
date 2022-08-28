import { CardRepositoryMethods } from "./card-repository.interface"
import { BaseRepository } from "../../common/base.repository"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"
import { Card } from "../card.entity"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"
import { inject, injectable } from "inversify"
import TYPES from "@/app/modules/common/types"
import { entityManager } from "@/config/db"

const repository = entityManager.getRepository(CardEntityOrm)

@injectable()
export class CardRepository implements CardRepositoryMethods {
  async create (data: CreateCardDto): Promise<Card | Card[]> {
    const card = repository.create(data)
    const savedCard = await repository.save(card)
    return savedCard
  }

  async find (): Promise<Card[]> {
    return await repository.find()
  }

  async findOne (id: string): Promise<Card> {
    return await repository.findOne({ where: { id } })
  }

  async update (data: UpdateCardDto): Promise<UpdateResult> {
    return await repository.update(data.id, data)
  }

  async delete (id: string): Promise<DeleteResult> {
    return await repository.delete(id)
  }
}
