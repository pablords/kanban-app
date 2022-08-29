import "reflect-metadata"
import * as bodyParser from "body-parser"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import errorHandlerMiddleware from "./app/middlewares/error-handler.middleware"
import TYPES from "./app/modules/common/types"
import { logger } from "./config/logger"

import "./app/modules/card/controllers/card.controller"
import "./app/modules/auth/controllers/auth.controller"

import { CardService } from "./app/modules/card/services/card.service"
import { CardServiceMethods } from "./app/modules/card/services/services.interface"
import { CardRepositoryMethods } from "./app/modules/card/repository/card-repository.interface"
import { CardRepository } from "./app/modules/card/repository/card.repository"
import { AuthServiceMethods } from "./app/modules/auth/services/auth-service.interface"
import { AuthService } from "./app/modules/auth/services/auth.service"
import { AuthRepositoryMethods } from "./app/modules/auth/repository/auth-repository.interface"
import { AuthRepository } from "./app/modules/auth/repository/auth.repository"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./docs/swagger.json"

const container = new Container()

export class App {
  constructor () {
    this.configDependencies()
    this.createServer()
  }

  configDependencies (): void {
    container
      .bind<CardServiceMethods>(TYPES.CardServiceInterface)
      .to(CardService)
    container
      .bind<CardRepositoryMethods>(TYPES.CardRepositoryInterface)
      .to(CardRepository)
    container
      .bind<AuthServiceMethods>(TYPES.AuthServiceInterface)
      .to(AuthService)
    container.bind<AuthRepositoryMethods>(TYPES.AuthRepositoryInterface).to(AuthRepository)
  }

  createServer (): void {
    const server: InversifyExpressServer = new InversifyExpressServer(
      container
    )
    server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      app.use(bodyParser.json())
      app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      app.use(errorHandlerMiddleware.logErrorMiddleware)
      app.use(errorHandlerMiddleware.returnError)
    })

    const app = server.build()
    app.listen(process.env.APP_PORT)
    logger.info(`Server started at port ${process.env.APP_PORT}`)
  }
}

export default new App()
