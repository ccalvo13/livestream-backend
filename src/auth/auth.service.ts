import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from "argon2";

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
    ) {}

    async signin(dto: AuthDto) {
        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        // If does not exist throw exception
        if (!user) {
            throw new ForbiddenException('Incorrect email or password')
        }

        // Compare password
        const matches = await argon.verify(user.password, dto.password);

        // Throw exception if did not match
        if (!matches) {
            throw new ForbiddenException('Incorrect email or password')
        }

        // Return user
        // return this.signToken(user.id, user.email);
    }
}
