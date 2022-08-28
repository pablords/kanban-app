import niv from "node-input-validator"
import { CreateCardDto } from "../dto/create-card.dto"

export async function fieldValidate (data: CreateCardDto) {
  const v = new niv.Validator(data, {
    title: "required|string",
    content: "required|string",
    list: "required|string"
  } as CreateCardDto)

  const matched = await v.check()

  if (!matched) return v.errors
}
