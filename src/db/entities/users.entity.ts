import {Column, Entity, ManyToOne, JoinTable, PrimaryColumn, JoinColumn} from "typeorm";
import {Task} from "./task.entity.js";

@Entity('users')
export class Users{
    @PrimaryColumn({type: "integer"})
    userid: number;

    @Column({name: 'username', type: "string" })
    username: string;

    @Column({name: 'passsword', type: "string" })
    passsword: string;

    @Column({name: 'role', type: "string" })
    role: string;

    @ManyToOne(()=>Task, (task)=>task.users);
    @JoinColumn()
    task: userid;
}