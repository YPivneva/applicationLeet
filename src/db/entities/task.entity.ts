import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import{Users} from "./users.entity.js";

@Entity('task')
export class Task{
    @PrimaryGeneratedColumn()
    id_list!: number;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "varchar" })
    description!: string;

    // @Column({type: "date" })
    // creatdate!: string;

    // @Column({type: "date" })
    // updateat!: string;

    // @Column({type: "varchar" })
    // bindTask: string;    

    @OneToMany(() => Users, (users) => users.task)
    users!: Users[];
}
