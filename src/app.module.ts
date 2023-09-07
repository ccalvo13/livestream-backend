import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { FilesModule } from './files/files.module';
import { StorageModule } from './storage/storage.module';
import ormconfig from "./orm.config";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ChatModule,
    FilesModule,
    StorageModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
