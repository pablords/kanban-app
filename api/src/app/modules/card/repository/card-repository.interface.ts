import { Card } from "../card.entity"
import { DeleteResult, UpdateResult } from "typeorm"
import { BaseRepositoryMethods } from "../../common/base.interface"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"

export interface CardRepositoryMethods extends BaseRepositoryMethods {
    create(data: CreateCardDto): Promise<Card | Card[]>;
    find(): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    delete(id: string): Promise<DeleteResult>;
    update(data: UpdateCardDto): Promise<UpdateResult>;
}
