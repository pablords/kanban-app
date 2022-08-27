import { Card } from "../card.entity"
import { Request, Response } from "express"
import { CreateCardDto } from "../dto/create-card.dto"
import { UpdateCardDto } from "../dto/update-card.dto"

export interface CardControllerMethods {
    createCard(
        req: Request<CreateCardDto>,
        res: Response
    ): Promise<Response<Card>>;
    getAllCards(req: Request, res: Response): Promise<Response<Card[]>>;
    getOneCard(req: Request, res: Response): Promise<Response<Card>>;
    deleteCard(req: Request, res: Response): Promise<Response<boolean>>;
    updateCard(req: Request<UpdateCardDto>, res: Response): Promise<Response<boolean>>;
}
