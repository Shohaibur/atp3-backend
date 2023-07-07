import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
//import { ManagerController } from './manager/manager.controller';
//import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [],
  controllers: [ ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}