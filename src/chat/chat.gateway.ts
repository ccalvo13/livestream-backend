import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket
  ) {
    const chat = await this.chatService.create(createChatDto, client.id);

    this.server.emit('message', chat);

    return chat;
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
  ) {
    return this.chatService.identify(name, client.id)
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const name = await this.chatService.getClientName(client.id);

    client.broadcast.emit('typing', { name, isTyping });
  }
}
