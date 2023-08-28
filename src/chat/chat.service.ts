import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  chats: Chat[] = [{name: 'Joe', text: 'Hey'}]
  clientToUser = {};
  
  identify(session: string, clientId: string) {
    this.clientToUser[clientId] = session;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createChatDto: CreateChatDto, clientId: string) {
    const chat = {
      name: this.clientToUser[clientId],
      text: createChatDto.text,
    };
    
    this.chats.push(chat);

    return chat;
  }

  findAll() {
    return this.chats;
  }
}
