import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RtStrategy } from 'src/strategy/rt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, PrismaService, ConfigService, JwtStrategy, RtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
