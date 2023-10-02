import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('users')
export class ChatController {

    constructor(private chatService: ChatService) {}

    @Get('list/:roomId')
    getClientList(@Param('roomId') roomId: string) {
        return this.chatService.getClientList(roomId);
    }

    @Delete('list/:roomId/:sessionId')
    async deleteClient(
        @Param('roomId') roomId: string,
        @Param('sessionId') sessionId: string
    ) {
        try {
            await this.chatService.deleteUser(roomId, sessionId);
        } catch (err) {
            throw err;
        }
    }

    @Delete('list/:roomId')
    async deleteRoom(@Param('roomId') roomId: string) {
        try {
            await this.chatService.deleteRoom(roomId);
      
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