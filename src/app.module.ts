import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import { ChatModule } from './chat/chat.module';
import { FilesModule } from './files/files.module';
import { StorageModule } from './storage/storage.module';
import ormconfig from "./orm.config";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
    PrismaModule,
    AuthModule,
    MessagesModule,
    ConversationModule,
    ChatModule,
    FilesModule,
    StorageModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
