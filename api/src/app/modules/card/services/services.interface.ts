import { BaseServiceMethods } from "../../common/base.interface"
import { Card } from "../card.entity"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"

export interface CardServiceMethods extends BaseServiceMethods{
    createCard(data: CreateCardDto): Promise<Card | Card[]>;
    findAllCards(): Promise<Card[]>;
    findOneCard(id: string): Promise<Card>;
    deleteCard(id: string): Promise<Card[]>;
    updateCard(data: UpdateCardDto): Promise<Card>;
}
