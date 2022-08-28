import "reflect-metadata"
import { BaseRepositoryMethods } from "./base.interface"
import { injectable } from "inversify"

@injectable()
export abstract class BaseService {
  constructor (protected repository: BaseRepositoryMethods) {
    this.repository = repository
  }
}
