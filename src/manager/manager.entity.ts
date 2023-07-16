import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeOrm";
import { UserEntity } from "src/user/user.entity";

@Entity('Manager')
export class ManagerEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({length:150})
    name:string;
    @Column({length:80})
    username:string;
    @Column()
    email:string;
    @Column()
    contact:number;
    @Column()
    password:string;

    // @OneToMany(() => UserEntity, user => user.manager)
    //     users:UserEntity[];
        
        @OneToMany(() => UserEntity, user => user.manager,{cascade: ["remove"]})
        users:UserEntity[];    
}