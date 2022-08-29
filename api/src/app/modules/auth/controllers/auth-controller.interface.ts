import { Request, Response } from "express"

export interface AuthControllerMethods{
    authenticate(req: Request, res: Response): Promise<any>
}
