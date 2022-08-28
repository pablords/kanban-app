import { Card } from "../card.entity"
import { Request, Response, NextFunction } from "express"

export interface CardControllerMethods {
    createCard(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<Card>>;
    getAllCards(req: Request, res: Response, next: NextFunction): Promise<Response<Card[]>>;
    getOneCard(req: Request, res: Response, next: NextFunction): Promise<Response<Card>>;
    deleteCard(req: Request, res: Response, next: NextFunction): Promise<Response<boolean>>;
    updateCard(req: Request, res: Response, next: NextFunction): Promise<Response<boolean>>;
}
