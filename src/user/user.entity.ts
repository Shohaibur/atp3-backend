import { ManagerEntity } from "src/manager/manager.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => ManagerEntity, manager => manager.users)
        manager:ManagerEntity;
}