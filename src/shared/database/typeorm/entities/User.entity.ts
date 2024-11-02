import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { Note } from "./Note.entity";
import { BaseEntity } from "./BaseEntity.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @Column({ type: "varchar", nullable: false })
    username: string

    @Column({ type: "varchar", nullable: false })
    email: string

    @Column({ type: "varchar", nullable: false })
    passwordHash: string

    @OneToMany(() => Note, (note) => note.createdBy)
    notes: Note[]

    @BeforeInsert()
    async hashPasswords() {
        const rounds = 10;
        const salt = await bcrypt.genSalt(rounds);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);

    }
}