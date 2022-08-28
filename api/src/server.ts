import "reflect-metadata"
import * as bodyParser from "body-parser"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"

import TYPES from "./app/modules/common/types"

import "./app/modules/card/controllers/card.controller"
import { CardService } from "./app/modules/card/services/card.services"
import { CardServiceMethods } from "./app/modules/card/services/services.interface"
import { CardRepositoryMethods } from "./app/modules/card/repository/card-repository.interface"
import { CardRepository } from "./app/modules/card/repository/card.repository"
import { logger } from "./config/logger"

const container = new Container()

export class App {
  constructor () {
    this.configDependencies()
    this.createServer()
  }

  configDependencies (): void {
    container.bind<CardServiceMethods>(TYPES.CardServiceInterface).to(CardService)
    container.bind<CardRepositoryMethods>(TYPES.CardRepositoryInterface).to(CardRepository)
  }

  createServer (): void {
    const server: InversifyExpressServer = new InversifyExpressServer(container)
    server.setConfig((app) => {
      app.use(bodyParser.urlencoded({
        extended: true
      }))
      app.use(bodyParser.json())
    })

    const app = server.build()
    app.listen(process.env.APP_PORT)
    logger.info(`Server started at port ${process.env.APP_PORT}`)
  }
}

export default new App()
