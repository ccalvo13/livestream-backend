import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ConnectedSocket, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
      origin: '*',
    }
})
@Controller('users')
export class ChatController {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) {}

    @Get('list/:roomId')
    getClientList(@Param('roomId') roomId: string) {
        return this.chatService.getClientList(roomId);
    }

    @Delete('list/:roomId/:sessionId')
    async deleteClient(
        @Param('roomId') roomId: string,
        @Param('sessionId') sessionId: string,
        @ConnectedSocket() client: Socket
    ) {
        try {
            await this.chatService.deleteUser(roomId, sessionId);
            
            client.emit('deleteUser', {roomId, sessionId});
      
            return {
              message: sessionId + " left the room"
            };
        } catch (err) {
            throw err;
        }
    }

    @Delete('list/:roomId')
    async deleteRoom(@Param('roomId') roomId: string, @ConnectedSocket() client: Socket) {
        try {
            await this.chatService.deleteRoom(roomId);
            
            client.emit('deleteRoom', roomId);
      
            return {
              message: "Call has ended"
            };
        } catch (err) {
            throw err;
        }
    }

    @Get(':sessionId')
    getUser(@Param('sessionId') sessionId: string) {
        return this.chatService.getClientInfo(sessionId);
    }
}