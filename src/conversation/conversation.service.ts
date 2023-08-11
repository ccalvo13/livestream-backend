import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Conversation } from './dto/conversation.dto';

@Injectable()
export class ConversationService {

    constructor(private prisma: PrismaService) {}

    getConvo(id: number) {
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
}
