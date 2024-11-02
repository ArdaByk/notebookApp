import { Column, Entity, ManyToOne} from "typeorm";
import { User } from "./User.entity";
import { BaseEntity } from "./BaseEntity.entity";

@Entity()
export class Note extends BaseEntity{

    @Column({type: "varchar", nullable: false})
    title: string

    @Column({type: "varchar"})
    content: string

    @ManyToOne(() => User, (user) => user.notes)
    createdBy: User

}