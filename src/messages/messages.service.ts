import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message } from './dto/messages.dto';
import { Conversation } from './dto/conversation.dto';

@Injectable()
export class MessagesService {

    constructor(private prisma: PrismaService) {}

    getMessage(id: number) {
        return this.prisma.conversation.findMany({
            where: {
                convoId: id,
            },
            include: {
                messages: true,
            }
        })
    }

    async createConvo(convo: Conversation) {
        return await this.prisma.conversation.create({
            data: {
                ...convo,
            }});
    }

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
