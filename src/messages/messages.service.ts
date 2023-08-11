import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from './dto/messages.dto';

@Injectable()
export class MessagesService {

    constructor(private prisma: PrismaService) {}

    async updateConvo(_id: number, message: Message): Promise<Message> {
        const convo = await this.prisma.conversation.findUnique({
            where: { convoId: _id }
        });
    
        if (!convo) {
          throw new Error('Conversation not found');
        }

        // message.convoId = _id;
    
        return await this.prisma.message.create({
            data: {
                ...message,
                convoId: _id,
            }
        });
    }
}
