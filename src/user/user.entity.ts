import { ManagerEntity } from "src/manager/manager.entity";
import { Column, Entity,JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    contact:number;
    managerID:number;

    @ManyToOne(() => ManagerEntity, manager => manager.users, {onDelete:"CASCADE"})
    @JoinColumn({name:'managerID'})
        manager:ManagerEntity;
}