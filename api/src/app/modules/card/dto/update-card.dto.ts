import { CreateCardDto } from "./create-card.dto"

export interface UpdateCardDto{
    id: string
    data: CreateCardDto
}
