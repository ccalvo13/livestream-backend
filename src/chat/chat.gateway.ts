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
  joinRoom(
    @MessageBody('sessionId') session: string,
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket
  ) {
    console.log('socket', client)
    return this.chatService.identify(roomId, session, client.id)
  }

  @SubscribeMessage('talking')
  async typing(
    @MessageBody('isTalking') isTalking: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const sessionId = await this.chatService.getClientSession(client.id);

    client.broadcast.emit('talking', { sessionId, isTalking });
  }
}
