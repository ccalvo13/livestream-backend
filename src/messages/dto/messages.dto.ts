import { IsOptional } from "class-validator";
import { from } from "rxjs";
import { Entity } from "typeorm";

@Entity()
export class Message {
    content: string;

    convoId: number;
}