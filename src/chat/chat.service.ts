import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {
  constructor() {
    super()
  }
  clientToUser = {};
  users = [];

  onModuleInit() {
    this.$connect();
  }
  
  identify(roomId: string, sessionId: string, clientId: string) {
    this.clientToUser[clientId] = sessionId;

    return Object.values(this.clientToUser);
  }

  getClientSession(clientId: string) {
    console.log(this.clientToUser)
    return this.clientToUser[clientId];
  }

  async getClientList(roomId: string) {
    this.users = await this.users.filter(user => user.roomId === roomId);

    return this.users;
  }

  async createRoom(roomId: string, sessionId: string, clientId: string) {
    this.identify(roomId, sessionId, clientId);

    try {
      await this.chat.create({
        data: {
            roomId,
            sessionId
        }
      });

      const user = {
        sessionId: sessionId,
        roomId: roomId,
      };
      
      this.users.push(user);
    } catch (e) {
      throw e
    }

    return {
      message: sessionId + " joined the room",
      sessionId: sessionId,
    }
  }

  async deleteRoom(roomId: string, sessionId: string) {
    try {
      await this.chat.deleteMany({
          where: {
            roomId,
            sessionId
          }
      });

      this.users = await this.users.filter(user => user.sessionId !== sessionId && user.roomId !== roomId);
      
      return {
        message: "Deleted successfully"
      };
    } catch (e) {
      throw e;
    }
  }
}
