import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { StorageService } from 'src/storage/storage.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class FilesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly storageService: StorageService) {}

//   @SubscribeMessage('record')
//   async record(
//     @MessageBody('data') data: any,
//     @ConnectedSocket() client: Socket
//   ) {
//     console.log('client', client)
//     console.log('data', data)
//     const chunks = await this.storageService.saveChunks(data);

//     client.broadcast.emit('record', { chunks});
//   }
}
