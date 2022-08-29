import { entityManager } from "@/config/db"
import { AuthEntityOrm } from "@/app/infra/entities/auth.entity.orm"
import { injectable } from "inversify"
import { AuthRepositoryMethods } from "./auth-repository.interface"
import { AuthDto } from "../dto/auth.dto"
import { Auth } from "../auth.entity"

const repository = entityManager.getRepository(AuthEntityOrm)

@injectable()
export class AuthRepository implements AuthRepositoryMethods {
  async saveUser (data: AuthDto): Promise<any> {
    const user = repository.create(data)
    return await repository.save(user)
  }

  async getUserByLogin (login: string): Promise<AuthEntityOrm> {
    return await repository.findOne({ where: { login } })
  }
}
