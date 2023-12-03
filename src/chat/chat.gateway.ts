import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { StorageService } from 'src/storage/storage.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  maxHttpBufferSize: 4e6,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly storageService: StorageService,
  ) {}

  afterInit(server: Server) {
    console.log('Socket.io server initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('roomId') roomId: string,
    @MessageBody('sessionId') sessionId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const count = await this.chatService.countRoom(roomId);
    let isHost;

    if (count <= 0) {
      isHost = true;
    } else {
      isHost = false;
    }

    await this.chatService.createRoom(roomId, sessionId, isHost, client.id);

    client.broadcast.emit('join', { roomId, sessionId, isHost });
  }

  @SubscribeMessage('talking')
  async talking(
    @MessageBody('isTalking') isTalking: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const sessionId = await this.chatService.getClientSession(client.id);

    client.broadcast.emit('talking', { sessionId, isTalking });
  }

  @SubscribeMessage('usersList')
  async getUsers(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const users = await this.chatService.getClientList(roomId);

    client.broadcast.emit('usersList', { users });
  }

  @SubscribeMessage('deleteUser')
  async deleteUser(
    @MessageBody('roomId') roomId: string,
    @MessageBody('sessionId') sessionId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('deleteUser', { roomId, sessionId });
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('deleteRoom', { roomId });
  }

  @SubscribeMessage('record')
  async record(
    @MessageBody('roomId') roomId: any,
    @MessageBody('data') data: any,
    @ConnectedSocket() client: Socket,
  ) {
    await this.storageService.saveChunks(roomId, data);
  }

  @SubscribeMessage('chat')
  async chat(
    @MessageBody('roomId') roomId: any,
    @MessageBody('sessionId') sessionId: any,
    @MessageBody('message') message: any,
    @ConnectedSocket() client: Socket,
  ) {
    const creationDate = new Date();
    const chat = {
      roomId,
      sessionId,
      message,
      creationDate,
    };
    const chats = await this.chatService.createChat(chat);

    console.log('chats', chats);
    client.broadcast.emit('chat', { chats });
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const sessionId = await this.chatService.getClientSession(client.id);

    client.broadcast.emit('typing', { sessionId, isTyping });
  }

  @SubscribeMessage('findAllChat')
  async findAllChat(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.getChatList(roomId);

    client.broadcast.emit('findAllChat', { chat });
  }
}
