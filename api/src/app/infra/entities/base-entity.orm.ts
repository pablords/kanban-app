import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

export class BaseEntityOrm {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    public updatedAt: Date;
}
