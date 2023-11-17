import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { FilesModule } from './files/files.module';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ChatModule,
    FilesModule,
    StorageModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController]
})
export class AppModule {}
