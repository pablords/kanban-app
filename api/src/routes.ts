import express from "express"
import factory from "@/app/modules/card/factory"

export const router = express.Router()

router.get("/cards", factory.cardController.getAllCards)
router.get("/cards/:id", factory.cardController.getOneCard)
router.put("/cards/:id", factory.cardController.updateCard)
router.delete("/cards/:id", factory.cardController.deleteCard)
