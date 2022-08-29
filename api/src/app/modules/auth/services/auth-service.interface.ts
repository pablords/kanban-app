import { AuthDto } from "../dto/auth.dto"
export interface AuthServiceMethods{
    authenticate(data: AuthDto): Promise<any>
}
