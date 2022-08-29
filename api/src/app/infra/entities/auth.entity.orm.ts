import { Entity, Column } from "typeorm"
import { Auth } from "@/app/modules/auth/auth.entity"
import { BaseEntityOrm } from "./base-entity.orm"

@Entity("auths")
export class AuthEntityOrm extends BaseEntityOrm implements Auth {
    @Column()
    login: string;

    @Column()
    password: string;
}
