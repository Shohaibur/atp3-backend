import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeOrm";
import { UserEntity } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: []
})

export class UserModule {}