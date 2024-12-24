import {Column, Entity, ManyToOne, JoinTable, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
// import {Task} from "./task.entity.js";

@Entity("users")
export class Users{
    @PrimaryGeneratedColumn()
    userid!: number;

    @Column({ name: "username", type: "varchar", unique: true })
    username!: string;

    // @Column({name: 'passsword', type: "varchar" })
    // passsword!: string;

    // @Column({name: 'role', type: "varchar", default: "user" })
    // role!: string;

    // @ManyToOne(()=>Task, (task)=>task.users);
    // @JoinColumn()
    // task: userid;
}