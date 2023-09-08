import { Controller, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class AppController {
    constructor(private chatService: ChatService) {}

    @Get()
    getClientList(roomId: string) {
        return this.chatService.getClientList(roomId);
    }
}