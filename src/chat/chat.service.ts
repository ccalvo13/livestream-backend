import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chat } from './entities/chat.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  clientToUser = {};
  
  identify(roomdId: string, sessionId: string, clientId: string) {
    this.clientToUser[clientId] = sessionId;

    return Object.values(this.clientToUser);
  }

  getClientSession(clientId: string) {
    console.log(this.clientToUser)
    return this.clientToUser[clientId];
  }

  async getClientList(roomId: string) {
    let clientList: {};
    try {
      clientList = await this.prisma.chat.findMany({
        where: {
            roomId
        }
      })
    } catch (e) {
      throw e
    }

    return clientList;
  }

  async createRoom(roomId: string, sessionId: string, clientId: string) {
    this.identify(roomId, sessionId, clientId);

    try {
      await this.prisma.chat.create({
        data: {
            roomId,
            sessionId
        }
      });
    } catch (e) {
      throw e
    }

    return {
      "message": sessionId + " joined the room"
    }
  }

  async countRoom(roomId: string) {
    const count = await this.prisma.chat.count({
      where: {
        roomId: roomId,
      },
    });
  
    return count;
  }
}
