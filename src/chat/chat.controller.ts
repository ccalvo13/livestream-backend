import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('users')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Get('list/:roomId')
    getClientList(@Param('roomId') roomId: string) {
        return this.chatService.getClientList(roomId);
    }
}