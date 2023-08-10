import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MessagesService, PrismaService, ConfigService],
  controllers: [MessagesController]
})
export class MessagesModule {}
