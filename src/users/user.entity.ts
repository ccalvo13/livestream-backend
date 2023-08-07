import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25})
    firstName: string;

    @Column({ length: 25})
    lastName: string;

    @Column()
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
    isActive: boolean;
}
