import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString({
        message: 'name must be a string',
    })
    @IsNotEmpty({ message: 'name must be not empty', })
    name: string;

    @IsNotEmpty({ message: 'email must be not empty', })
    @IsEmail({}, { message: 'Your inpout must be email', })
    email: string;

    @IsNotEmpty({ message: 'Password must be not empty', })
    @IsString({ message: 'Password must be a string', })
    password: string;

    createdAt?: Date;
    updatedAt?: Date;
}
