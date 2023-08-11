import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './dto/conversation.dto';

@Controller('conversation')
export class ConversationController {

    constructor(private service: ConversationService) {}

    @Get(':id')
    get(@Param() params) {
        return this.service.getConvo(parseInt(params.id));
    }

    @Post()
    createConvo(@Body() convo: Conversation) {
        return this.service.createConvo(convo);
    }
}
