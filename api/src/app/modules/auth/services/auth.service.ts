import "reflect-metadata"
import { injectable } from "inversify"
import { AuthServiceMethods } from "./auth-service.interface"
import jwt from "jsonwebtoken"
import { AuthDto } from "../dto/auth.dto"
import { randomUUID } from "crypto"

@injectable()
export class AuthService implements AuthServiceMethods {
  async authenticate (data: AuthDto) {
    if (process.env.LOGIN && process.env.PASSWORD) {
      const id = randomUUID()
      const token = jwt.sign({ id }, process.env.SECRET_API, {
        expiresIn: 300
      })
      return {
        token: token,
        expiresIn: 300
      }
    }
  }
}
