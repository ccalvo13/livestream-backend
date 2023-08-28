import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "typeorm";

@Entity()
export class Conversation {
    @ApiProperty()
    from: number;

    @ApiProperty()
    to: number;
}