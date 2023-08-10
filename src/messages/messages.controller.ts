import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Conversation } from './dto/conversation.dto';
import { Message } from './dto/messages.dto';

@Controller('messages')
export class MessagesController {

    constructor(private service: MessagesService) {}

    @Get(':id')
    get(@Param() params) {
        return this.service.getMessage(parseInt(params.id));
    }

    @Post()
    createConvo(@Body() convo: Conversation) {
        return this.service.createConvo(convo);
    }

    @Post(':id')
    updateConvo(@Param() params, @Body() message: Message) {
        return this.service.updateConvo(parseInt(params.id), message);
    }
}
