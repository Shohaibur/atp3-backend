import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeOrm';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ManagerModule,UserModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'manager_db',
      autoLoadEntities: true,
      synchronize: true,
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}