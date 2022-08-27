import { BaseServiceMethods } from "./base.interface"

export abstract class BaseController {
  constructor (protected service: BaseServiceMethods) {
    this.service = service
  }
}
