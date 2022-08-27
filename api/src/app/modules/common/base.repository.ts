import { Repository } from "typeorm"
import { BaseEntityOrm } from "@/app/infra/entities/base-entity.orm"

export abstract class BaseRepository {
  constructor (protected repository: Repository<BaseEntityOrm>) {
    this.repository = repository
  }
}
