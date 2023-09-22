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
    deleteClient(@Param('roomId') roomId: string, @Param('sessionId') sessionId: string) {
        return this.chatService.deleteUser(roomId, sessionId);
    }

    @Delete('list/:roomId')
    deleteRoom(@Param('roomId') roomId: string) {
        return this.chatService.deleteRoom(roomId);
    }

    @Get(':sessionId')
    getUser(@Param('sessionId') sessionId: string) {
        return this.chatService.getClientInfo(sessionId);
    }
}