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

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('roomId') roomId: string,
    @MessageBody('sessionId') sessionId: string,
    @ConnectedSocket() client: Socket
  ) {
    await this.chatService.createRoom(roomId, sessionId, client.id);

    client.broadcast.emit('join', { sessionId });
  }

  @SubscribeMessage('talking')
  async typing(
    @MessageBody('isTalking') isTalking: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const sessionId = await this.chatService.getClientSession(client.id);

    client.broadcast.emit('talking', { sessionId, isTalking });
  }

  @SubscribeMessage('usersList')
  async getUsers(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    const users = await this.chatService.getClientList(roomId);

    client.broadcast.emit('usersList', { users });
  }
}
