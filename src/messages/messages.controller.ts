import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './dto/messages.dto';

@Controller('messages')
export class MessagesController {

    constructor(private service: MessagesService) {}

    @Post(':id')
    updateConvo(@Param() params, @Body() message: Message) {
        return this.service.updateConvo(parseInt(params.id), message);
    }
}
