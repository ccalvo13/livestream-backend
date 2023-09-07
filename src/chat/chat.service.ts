import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  clientToUser = {};
  
  identify(roomdId: string, session: string, clientId: string) {
    console.log('client id', clientId)
    this.clientToUser[clientId] = session;

    return Object.values(this.clientToUser);
  }

  getClientSession(clientId: string) {
    console.log(this.clientToUser)
    return this.clientToUser[clientId];
  }
}
