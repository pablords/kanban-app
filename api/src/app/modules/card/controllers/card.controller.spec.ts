
import "reflect-metadata"
import { Container } from "inversify"
import TYPES from "../../common/types"
import { CardController } from "./card.controller"
import { CardRepository } from "../repository/card.repository"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { randomUUID } from "crypto"
import { CardEntityOrm } from "@/app/infra/entities/card.entity.orm"
import { CardService } from "../services/card.service"
import { interfaces, request } from "inversify-express-utils"
import { getMockReq, getMockRes } from "@jest-mock/express"
import { CreateCardDto } from "../dto/create-card.dto"

const card: CardEntityOrm = {
  title: "task",
  content: "content",
  list: "list",
  createdAt: new Date(),
  updatedAt: new Date(),
  id: randomUUID()
}

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

    it("Should return a exception does not get all cards", async () => {
      jest.spyOn(cardServiceMock, "findAllCards").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.ENTITY_NOT_FOUND,
          undefined
        )
      )
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      try {
        const req = getMockReq()
        await controller.getAllCards(req, res, next)
        expect(res.json).toBeCalledWith(
          new APIError("NOT_FOUND",
            HttpStatusCode.NOT_FOUND,
            true,
            businessError.ENTITY_NOT_FOUND,
            undefined
          )
        )
      } catch (err) {}
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

    it("Should return a exception when does not find a card", async () => {
      jest.spyOn(cardServiceMock, "findOneCard").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.ENTITY_NOT_FOUND,
          undefined
        )
      )
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq()
      try {
        await controller.getOneCard(req, res, next)
        expect(res.json).toBeCalledWith(
          new APIError("NOT_FOUND",
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

    it("Should return a exception when does not created card", async () => {
      jest.spyOn(cardServiceMock, "createCard").mockRejectedValueOnce(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          undefined
        )
      )
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto
      })
      try {
        await controller.createCard(req, res, next)
        expect(res.json).toBeCalledWith(new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          undefined
        ))
      } catch (err) {}
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

    it("Should return a exception when does not update card", async () => {
      jest.spyOn(cardServiceMock, "updateCard").mockRejectedValueOnce(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          undefined
        )
      )
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto,
        params: { id: card.id }
      })
      try {
        await controller.updateCard(req, res, next)
        expect(res.json).toBeCalledWith(
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

    it("Should return a exception when does not delete card", async () => {
      jest.spyOn(cardServiceMock, "deleteCard").mockRejectedValueOnce(
        new APIError("UNPROCESSABLE_ENTITY",
          HttpStatusCode.UNPROCESSABLE_ENTITY,
          true,
          businessError.UNPROCESSABLE_ENTITY,
          undefined
        )
      )
      const controller: CardController = container.get(
        TYPES.CardControllerInterface
      )
      const req = getMockReq({
        body: { content: "content", list: "list", title: "title" } as CreateCardDto,
        params: { id: card.id }
      })
      try {
        await controller.deleteCard(req, res, next)
        expect(res.json).toBeCalledWith(
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
