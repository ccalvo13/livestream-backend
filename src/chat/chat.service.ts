import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {
  constructor() {
    super()
  }
  clientToUser = {};

  onModuleInit() {
    this.$connect();
  }
  
  identify(roomdId: string, sessionId: string, clientId: string) {
    this.clientToUser[clientId] = sessionId;

    return Object.values(this.clientToUser);
  }

  getClientSession(clientId: string) {
    console.log(this.clientToUser)
    return this.clientToUser[clientId];
  }

  async getClientList(roomId: string) {
    let clientList: any;
    try {
      clientList = await this.chat.findMany({
        where: {
            roomId
        }
      })
    } catch (e) {
      throw e
    }

    return {
      message: "Users list retrieved successfully",
      data: clientList,
      count: clientList.length,
    }
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
    } catch (e) {
      throw e
    }

    return {
      "message": sessionId + " joined the room"
    }
  }

  async deleteRoom(roomId: string) {
    try {
      // await this.chat.delete({
      //     where: {
      //       roomId
      //     }
      // });
    } catch (e) {

    }
  }
}
