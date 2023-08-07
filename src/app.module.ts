import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from "./orm.config";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class AppModule {}
