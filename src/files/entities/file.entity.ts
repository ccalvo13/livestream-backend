import { ApiProperty } from "@nestjs/swagger";

export class File {
    @ApiProperty()
    fileName: string;
}
