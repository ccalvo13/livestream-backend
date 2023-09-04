import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class File {
    @ApiProperty()
    @PrimaryColumn()
    fileName: string;
}
