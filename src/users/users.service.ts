import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../shared/dto/user.dto';
import * as argon from "argon2";

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async getUsers(user: User): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async getUser(_id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: _id }
        })
    }

    async createUser(user: User) {
        const hash = await argon.hash(user.password);
        return await this.prisma.user.create({
            data: {
                ...user,
                birthday: new Date(user.birthday).toISOString(),
                password: hash,
            }});
    }

    async updateUser(_id: number, updatedUser: Partial<User>): Promise<User> {
        const hash = await argon.hash(updatedUser?.password);
        const user = await this.prisma.user.findUnique({
            where: { id: _id }
        });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        return await this.prisma.user.update({
            where: {
                id: _id,
            },
            data: {
                ...updatedUser,
                birthday: new Date(user.birthday).toISOString(),
                password: hash,
            }
        });
    }

    async deleteUser(_id: number) {
        return await this.prisma.user.delete({
            where: {
                id: _id,
            }
        });
    }
}
