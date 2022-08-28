import { BaseServiceMethods } from "./base.interface"
import { autoInjectable, injectable } from "tsyringe"

export abstract class BaseController {
  constructor (protected service: BaseServiceMethods) {
    this.service = service
  }
}
