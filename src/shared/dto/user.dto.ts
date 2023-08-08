import { IsEmail } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity()
export class User {
    @Column({ length: 25})
    firstName: string;

    @Column({ length: 25})
    lastName: string;

    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    userName: string;

    @Column()
    profilePictureUrl: string;

    @Column()
    bio: string;

    @Column()
    password: string;

    @Column('date')
    birthday: Date;

    @Column()
    status: string;
}
