import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import{Users} from "./users.entity.js";

@Entity('task')
export class Task{
    @PrimaryColumn({type: "integer"})
    id_list: number;

    @Column({name: 'title', type: "string" })
    title: string;

    @Column({name: 'description', type: "string" })
    description: string;

    @Column({name: 'creatdate', type: "date" })
    creatdate: string;

    @Column({name: 'updateat', type: "date" })
    updateat: string;

    @Column({name: 'bindTask', type: "integer" })
    bindTask: string;    

    @Column({name: 'userid', type: "integer" })
    userid: string;

    @OneToMany(()=>Users, (users)=>users.username);
    users:Users[];
}