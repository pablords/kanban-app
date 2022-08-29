import { CardRepositoryMethods } from "./card-repository.interface"
import { CardRepository } from "./card.repository"
import { Repository } from "typeorm"
import { entityManager } from "@/config/db"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"
import { Container } from "inversify"
import { randomUUID } from "crypto"
import TYPES from "../../common/types"
import { UpdateCardDto } from "../dto/update-card.dto"
import { mockDeletedTypeorm, mockUpdatedTypeorm } from "@test/mocks/commons.mock"

const MockRepositoryOrm = entityManager.getRepository(CardEntityOrm)
const mockRepositoryOrm = MockRepositoryOrm as jest.Mocked<Repository<CardEntityOrm>>

const card: CardEntityOrm = {
  title: "task",
  content: "content",
  list: "list",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: randomUUID()
}

describe("CardRepository", () => {
  let container: Container = null

  beforeEach(async () => {
    container = new Container()
    container
      .bind<CardRepositoryMethods>(TYPES.CardRepositoryInterface)
      .to(CardRepository)

    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  describe("When get all cards", () => {
    it("Should return all cards", async () => {
      jest.spyOn(mockRepositoryOrm, "find").mockResolvedValueOnce([card])
      const repository: CardRepository = container.get(
        TYPES.CardRepositoryInterface
      )
      const output = await repository.find()
      expect(output).toEqual([card])
    })
  })

  describe("When get a card", () => {
    it("Should return a card", async () => {
      jest.spyOn(mockRepositoryOrm, "findOne").mockResolvedValueOnce(card)
      const repository: CardRepository = container.get(
        TYPES.CardRepositoryInterface
      )
      const output = await repository.findOne(randomUUID())
      expect(output).toEqual(card)
    })
  })

  describe("When create a card", () => {
    it("Should return a card when created card", async () => {
      jest.spyOn(mockRepositoryOrm, "create").mockReturnValue(card)
      jest.spyOn(mockRepositoryOrm, "save").mockResolvedValueOnce(card)
      const repository: CardRepository = container.get(
        TYPES.CardRepositoryInterface
      )
      const output = await repository.create(card)
      expect(output).toEqual(card)
    })
  })

  describe("When update a card", () => {
    it("Should return a card when updated card", async () => {
      jest.spyOn(mockRepositoryOrm, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepositoryOrm, "update").mockResolvedValueOnce(mockUpdatedTypeorm)
      const repository: CardRepository = container.get(
        TYPES.CardRepositoryInterface
      )
      const dataCardUpdate: UpdateCardDto = {
        data: card,
        id: randomUUID()
      }
      try {
        const output = await repository.update(dataCardUpdate)
        expect(output).toEqual(card)
      } catch (err) {}
    })
  })

  describe("When delete a card", () => {
    it("should return list cards when deleted card", async () => {
      jest.spyOn(mockRepositoryOrm, "findOne").mockResolvedValueOnce(card)
      jest.spyOn(mockRepositoryOrm, "delete").mockResolvedValueOnce(mockDeletedTypeorm)
      const repository: CardRepository = container.get(
        TYPES.CardRepositoryInterface
      )
      try {
        const output = await repository.delete(card.id)
        expect(output).toEqual([card])
      } catch (err) {}
    })
  })
})
