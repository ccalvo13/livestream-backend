import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import ormconfig from "./orm.config";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
    PrismaModule,
    AuthModule,
    MessagesModule,
    ConversationModule,
  ],
})
export class AppModule {}
