import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LiveChat } from './entities/livechat.entity';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  clientToUser = {};
  users = [];
  chats: LiveChat[] = [
    {
      roomId: 'test',
      sessionId: 'test',
      message: 'test message',
      creationDate: '12/12/2023',
    },
  ];

  onModuleInit() {
    this.$connect();
  }

  identify(roomId: string, sessionId: string, clientId: string) {
    this.clientToUser[clientId] = sessionId;

    return Object.values(this.clientToUser);
  }

  getClientSession(clientId: string) {
    return this.clientToUser[clientId];
  }

  async getClientList(roomId: string) {
    this.users = await this.users.filter((user) => user.roomId === roomId);

    return this.users;
  }

  async getClientInfo(sessionId: string) {
    const user = await this.chat.findUnique({
      where: {
        sessionId,
      },
    });

    return {
      data: user,
    };
  }

  async createRoom(
    roomId: string,
    sessionId: string,
    isHost: boolean,
    clientId: string,
  ) {
    await this.identify(roomId, sessionId, clientId);

    try {
      await this.chat.create({
        data: {
          roomId,
          sessionId,
          isHost,
        },
      });

      const user = {
        sessionId: sessionId,
        roomId: roomId,
        isHost,
      };

      this.users.push(user);
    } catch (e) {
      throw e;
    }

    return {
      message: sessionId + ' joined the room',
      sessionId: sessionId,
    };
  }

  async deleteRoom(roomId: string) {
    try {
      await this.chat.deleteMany({
        where: {
          roomId,
        },
      });

      this.users = await this.users.filter((user) => user.roomId !== roomId);
    } catch (e) {
      throw e;
    }
  }

  async deleteUser(roomId: string, sessionId: string) {
    try {
      await this.chat.deleteMany({
        where: {
          roomId,
          sessionId,
        },
      });

      this.users = await this.users.filter(
        (user) => user.sessionId !== sessionId && user.roomId !== roomId,
      );

      return {
        message: sessionId + ' left the room',
      };
    } catch (e) {
      throw e;
    }
  }

  async countRoom(roomId: string) {
    const count = await this.chat.count({
      where: {
        roomId: roomId,
      },
    });

    return count;
  }

  async createChat(chat: LiveChat) {
    console.log('chat', chat);
    try {
      await this.conversation.create({
        data: chat,
      });

      this.chats.push(chat);

      return this.chats;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getChatList(roomId: string) {
    const chat = await this.conversation.findMany({
      where: {
        roomId: roomId,
      },
    });

    this.chats = chat;

    return chat;
  }
}
