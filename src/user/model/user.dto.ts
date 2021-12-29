import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { IsDefined, IsEmail, IsString } from "class-validator";

export class User {
    @IsDefined()
    @IsString()
    @prop()
    @ApiProperty({
        type: String,
        default: 'John Doe',
        description: 'The name of the user'
    })
    name: string;

    @IsDefined()
    @IsEmail()
    @prop()
    @ApiProperty({
        type: String,
        example: 'email@example.com',
        description: 'The email'
    })
    email: string;

    @IsDefined()
    @prop()
    age: number;
}