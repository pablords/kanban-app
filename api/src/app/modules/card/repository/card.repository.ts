import { CardRepositoryMethods } from "./card-repository.interface"
import { BaseRepository } from "../../common/base.repository"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"
import { Card } from "../card.entity"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"

export class CardRepository extends BaseRepository implements CardRepositoryMethods {
  constructor (protected repository: Repository<CardEntityOrm>) {
    super(repository)
  }

  async create (data: CreateCardDto): Promise<Card | Card[]> {
    const card = this.repository.create(data)
    const savedCard = await this.repository.save(card)
    return savedCard
  }

  async find (): Promise<Card[]> {
    return await this.repository.find()
  }

  async findOne (id: string): Promise<Card> {
    return await this.repository.findOne({ where: { id } })
  }

  async update (data: UpdateCardDto): Promise<UpdateResult> {
    return await this.repository.update(data.id, data)
  }

  async delete (id: string): Promise<DeleteResult> {
    return await this.repository.delete(id)
  }
}
