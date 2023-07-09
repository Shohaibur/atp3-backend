import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerEntity } from "./manager.entity";
import { TypeOrmModule } from "@nestjs/typeOrm";
import { UserEntity } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity, UserEntity])],
  controllers: [ManagerController],
  providers: [ManagerService]
})
export class ManagerModule {}