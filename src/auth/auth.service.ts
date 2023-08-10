import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
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
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string
    ) : Promise<{userId: number, accessToken: string, refreshToken: string}>{
        const payload = {
            sub: userId,
            email
        };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_ACCESS_TOKEN_SECRET')
        });

        const refresh = await this.jwt.signAsync(payload, {
            expiresIn: '7d',
            secret: this.config.get('JWT_REFRESH_TOKEN_SECRET')
        });

        return {
            userId,
            accessToken: token,
            refreshToken: refresh,
        }
    }
}
