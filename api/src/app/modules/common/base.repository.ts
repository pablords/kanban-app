import { Repository } from "typeorm"
import { BaseEntityOrm } from "@/app/infra/entities/base-entity.orm"
import { injectable } from "inversify"

@injectable()
export abstract class BaseRepository {
  constructor (protected repositoryOrm: Repository<BaseEntityOrm>) {
    this.repositoryOrm = repositoryOrm
  }
}
