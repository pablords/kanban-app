import { httpPost, BaseHttpController, controller } from "inversify-express-utils"
import { AuthControllerMethods } from "./auth-controller.interface"
import { AuthServiceMethods } from "../services/auth-service.interface"
import { inject } from "inversify"
import TYPES from "../../common/types"
import { Request, Response } from "express"

@controller('')
export class AuthController extends BaseHttpController implements AuthControllerMethods {
    private _authService: AuthServiceMethods;

    constructor (
          @inject(TYPES.AuthServiceInterface) authService: AuthServiceMethods
    ) {
      super()
      this._authService = authService
    }

    @httpPost('/login')
    async authenticate (req: Request, res: Response) {
      return await this._authService.authenticate(req.body)
    }
}
