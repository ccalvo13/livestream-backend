import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET')
        });
    }

    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });

        delete user.password;
        return user;
    }

}