import { Card } from "@/app/modules/card/card.entity"
import {
  Entity,
  Column
} from "typeorm"
import { BaseEntityOrm } from "./base-entity.orm"

@Entity("cards")
export class CardEntityOrm extends BaseEntityOrm implements Card {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    list: string;
}
