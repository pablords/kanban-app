import "reflect-metadata"
import { injectable, inject } from "inversify"
import { AuthServiceMethods } from "./auth-service.interface"
import jwt from "jsonwebtoken"
import { AuthDto } from "../dto/auth.dto"
import { AuthRepositoryMethods } from "../repository/auth-repository.interface"
import { randomUUID } from "crypto"
import TYPES from "../../common/types"
import bcrypt from "bcrypt"

@injectable()
export class AuthService implements AuthServiceMethods {
  private _authRepository: AuthRepositoryMethods
  constructor (@inject(TYPES.AuthRepositoryInterface) authRepository: AuthRepositoryMethods) {
    this._authRepository = authRepository
  }

  async authenticate (data: AuthDto) {
    const login = process.env.LOGIN
    const password = process.env.PASSWORD

    if (login && password) {
      const user = await this._authRepository.getUserByLogin(login)
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_API, {
          expiresIn: 300
        })
        return {
          token: token,
          expiresIn: 300
        }
      }

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)
      const { id } = await this._authRepository.saveUser({ login: login, password: passwordHash })
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
