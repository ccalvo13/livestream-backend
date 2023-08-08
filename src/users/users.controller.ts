import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../shared/dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Get()
    getUsers(@Param() user: User) {
        return this.service.getUsers(user);
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(parseInt(params.id));
    }

    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Put(':id')
    update(@Param() params, @Body() user: User) {
        return this.service.updateUser(parseInt(params.id), user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(parseInt(params.id));
    }
}
