import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}
