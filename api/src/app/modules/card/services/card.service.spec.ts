import { Container } from "inversify"
import TYPES from "../../common/types"
import { CardService } from "./card.service"
import { CardServiceMethods } from "./services.interface"
import { CardRepository } from "../repository/card.repository"
import { Card } from "../card.entity"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { UpdateCardDto } from "../dto/update-card.dto"
import { randomUUID } from "crypto"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"

const card: CardEntityOrm = {
  title: "task",
  content: "content",
  list: "list",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: randomUUID()
}

const mockRepository = {
  find: jest.fn().mockReturnValue(card),
  create: jest.fn().mockReturnValue(card),
  findOne: jest.fn().mockReturnValue(card),
  update: jest.fn().mockReturnValue(card),
  delete: jest.fn().mockReturnValue([card])
}

const mockService = {
  findOneCard: jest.fn().mockReturnValue(card)
}

describe("CardService", () => {
  let CardRepositoryMock: CardRepository
  let container: Container = null

  beforeEach(async () => {
    CardRepositoryMock = mockRepository
    container = new Container()
    container
      .bind<CardServiceMethods>(TYPES.CardServiceInterface)
      .to(CardService)
    container
      .bind<CardRepository>(TYPES.CardRepositoryInterface)
      .toConstantValue(CardRepositoryMock)

    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  describe("When get all cards", () => {
    it("Should return all cards", async () => {
      jest.spyOn(mockRepository, "find").mockResolvedValueOnce([card])
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const output = await service.findAllCards()
      expect(output).toEqual([card])
    })
  })

  describe("When get a card", () => {
    it("Should return a card", async () => {
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(card)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const output = await service.findOneCard(randomUUID())
      expect(output).toEqual(card)
    })

    it("Should return a exception when does not find a card", async () => {
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(null)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      try {
        const output = await service.findOneCard("1")
        expect(output).toThrow(
          new APIError(
            "NOT_FOUND",
            HttpStatusCode.NOT_FOUND,
            true,
            businessError.ENTITY_NOT_FOUND,
            undefined
          )
        )
      } catch (err) {}
    })
  })

  describe("When create a card", () => {
    it("Should return a card when created card", async () => {
      jest.spyOn(mockRepository, "create").mockResolvedValueOnce(card)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const output = await service.createCard(card)
      expect(output).toEqual(card)
    })

    it("Should return a exception when does not create a card", async () => {
      jest.spyOn(mockRepository, "create").mockResolvedValueOnce(null)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      try {
        const output = await service.createCard(card)
        expect(output).toThrow(
          new APIError(
            "UNPROCESSABLE_ENTITY",
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            true,
            businessError.UNPROCESSABLE_ENTITY,
            undefined
          )
        )
      } catch (err) {}
    })
  })

  describe("When update a card", () => {
    it("Should return a card when updated card", async () => {
      jest.spyOn(mockService, "findOneCard").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "update").mockResolvedValueOnce(card)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const dataCardUpdate: UpdateCardDto = {
        data: card,
        id: randomUUID()
      }
      try {
        const output = await service.updateCard(dataCardUpdate)
        expect(output).toEqual(card)
      } catch (err) {}
    })

    it("Should return a exception when does not find card", async () => {
      jest.spyOn(mockService, "findOneCard").mockResolvedValueOnce(null)
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(null)
      jest.spyOn(mockRepository, "update").mockResolvedValueOnce(null)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const dataCardUpdate: UpdateCardDto = {
        data: card,
        id: randomUUID()
      }
      try {
        const output = await service.updateCard(dataCardUpdate)
        expect(output).toThrow(
          new APIError("NOT_FOUND",
            HttpStatusCode.NOT_FOUND,
            true,
            businessError.ENTITY_NOT_FOUND,
            undefined
          )
        )
      } catch (err) {}
    })

    it("Should return a exception when does not updated card", async () => {
      jest.spyOn(mockService, "findOneCard").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "update").mockResolvedValueOnce(null)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      const dataCardUpdate: UpdateCardDto = {
        data: card,
        id: randomUUID()
      }

      try {
        const output = await service.updateCard(dataCardUpdate)
        expect(output).toThrow(
          new APIError("UNPROCESSABLE_ENTITY",
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            true,
            businessError.UNPROCESSABLE_ENTITY,
            undefined
          )
        )
      } catch (err) {}
    })
  })

  describe("When delete a card", () => {
    it("should return list cards when deleted card", async () => {
      jest.spyOn(mockService, "findOneCard").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(card.id)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      try {
        const output = await service.deleteCard(card.id)
        expect(output).toEqual([card])
      } catch (err) {}
    })

    it("should return a exception when does not deleted card", async () => {
      jest.spyOn(mockService, "findOneCard").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(null)
      const service: CardService = container.get(
        TYPES.CardServiceInterface
      )
      try {
        const output = await service.deleteCard(card.id)
        expect(output).toThrow(
          new APIError("UNPROCESSABLE_ENTITY",
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            true,
            businessError.UNPROCESSABLE_ENTITY,
            undefined
          )
        )
      } catch (err) {}
    })
  })
})
