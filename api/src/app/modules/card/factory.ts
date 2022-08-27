import { CardController } from "./controllers/card.controller"
import { CardService } from "./services/card.services"
import { CardRepository } from "./repository/card.repository"
import { entityManager } from "@/config/db"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"

const repository = entityManager.getRepository(CardEntityOrm)

const cardRepository = new CardRepository(repository)
const cardService = new CardService(cardRepository)
const cardController = new CardController(cardService)

export default {
  cardController,
  cardRepository,
  cardService
}
