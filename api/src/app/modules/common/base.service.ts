import { BaseRepositoryMethods } from "./base.interface"
export abstract class BaseService {
  constructor (protected repository: BaseRepositoryMethods) {
    this.repository = repository
  }
}
