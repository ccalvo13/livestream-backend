import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatController } from './chat.controller';
import { StorageService } from 'src/storage/storage.service';

@Module({
  providers: [ChatGateway, ChatService, StorageService],
  imports: [PrismaModule],
  controllers: [ChatController]
})
export class ChatModule {}
