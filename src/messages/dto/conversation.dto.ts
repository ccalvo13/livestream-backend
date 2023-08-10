import { IsOptional } from "class-validator";
import { from } from "rxjs";
import { Entity } from "typeorm";

@Entity()
export class Conversation {
    from: number;

    to: number;
}