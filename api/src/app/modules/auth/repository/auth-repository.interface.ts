import { AuthDto } from "../dto/auth.dto"
import { AuthEntityOrm } from "@/app/infra/entities/auth.entity.orm"

export interface AuthRepositoryMethods{
    saveUser(data: AuthDto): Promise<AuthEntityOrm>
    getUserByLogin(login: string): Promise<AuthEntityOrm>
}
