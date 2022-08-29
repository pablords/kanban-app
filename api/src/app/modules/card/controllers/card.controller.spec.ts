
import "reflect-metadata"
import { Container } from "inversify"
import TYPES from "../../common/types"
import { CardController } from "./card.controller"
import { CardControllerMethods } from "./card-controller.interface"
import { CardRepository } from "../repository/card.repository"
import { Card } from "../card.entity"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { UpdateCardDto } from "../dto/update-card.dto"
import { randomUUID } from "crypto"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"
import { CardService } from "../services/card.service"
import { CardServiceMethods } from "../services/services.interface"
import { interfaces, request } from "inversify-express-utils"
import { getMockReq, getMockRes } from "@jest-mock/express"
import { entityManager } from "@/config/db"
import { Repository } from "typeorm"
import { CreateCardDto } from "../dto/create-card.dto"

const card: CardEntityOrm = {
  title: "task",
  content: "content",
  list: "list",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: randomUUID()
}

const MockRepositoryOrm = entityManager.getRepository(CardEntityOrm)
const mockRepositoryOrm = MockRepositoryOrm as jest.Mocked<Repository<CardEntityOrm>>

const mockRepository = jest.mocked(new CardRepository())
const cardServiceMock = jest.mocked(new CardService(mockRepository))

const mockRequest = getMockReq()
const mockResponse = getMockRes()

const mockUser: interfaces.Principal = {
  details: "",
  isAuthenticated: () => Promise.resolve(true),
  isResourceOwner: () => Promise.resolve(true),
  isInRole: () => Promise.resolve(true)
}

const { res, next, clearMockRes, mockClear } = getMockRes()

describe("CardService", () => {
  let CardRepositoryMock: CardRepository
  let CardServiceMock: CardService
  let container: Container = null

  beforeEach(async () => {
    CardServiceMock = cardServiceMock
    container = new Container()
    const mockedHttpContext: interfaces.HttpContext = {
      request: mockRequest,
      response: mockResponse,
      user: mockUser
    }
    container.bind<CardController>(TYPES.CardControllerInterface).to(CardController)
    container.bind<CardService>(TYPES.CardServiceInterface).toConstantValue(CardServiceMock)
    container
      .bind<CardRepository>(TYPES.CardRepositoryInterface)
      .toConstantValue(CardRepositoryMock)

    container.bind<interfaces.HttpContext>(Symbol.for("HttpContext")).toConstantValue(mockedHttpContext)

    jest.clearAllMocks()
    jest.resetAllMocks()
    clearMockRes()
    mockClear()
  })

  describe("When get all cards", () => {
    it("Should return all cards", async () => {
      jest.spyOn(cardServiceMock, "findAllCards").mockResolvedValueOnce([card])
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq()
      await controller.getAllCards(req, res, next)
      expect(res.json).toBeCalledWith([card])
    })
  })

  describe("When get a card", () => {
    it("Should return a card", async () => {
      jest.spyOn(cardServiceMock, "findOneCard").mockResolvedValueOnce(card)
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq()
      await controller.getOneCard(req, res, next)
      expect(res.json).toBeCalledWith(card)
    })
  })

  describe("When create a card", () => {
    it("Should return a card when created card", async () => {
      jest.spyOn(cardServiceMock, "createCard").mockResolvedValueOnce(card)
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto
      })
      await controller.createCard(req, res, next)
      expect(res.json).toBeCalledWith(card)
    })
  })

  describe("When update a card", () => {
    it("Should return card when update card", async () => {
      jest.spyOn(cardServiceMock, "updateCard").mockResolvedValueOnce(card)
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto,
        params: { id: card.id }
      })
      await controller.updateCard(req, res, next)
      expect(res.json).toBeCalledWith(card)
    })
  })

  describe("When delete a card", () => {
    it("Should return a list card when delete card", async () => {
      jest.spyOn(cardServiceMock, "deleteCard").mockResolvedValueOnce([card])
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto,
        params: { id: card.id }
      })
      await controller.deleteCard(req, res, next)
      expect(res.json).toBeCalledWith([card])
    })
  })
})
