import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { from } from "rxjs";
import { Entity } from "typeorm";

@Entity()
export class Conversation {
    @ApiProperty()
    from: number;

    @ApiProperty()
    to: number;
}