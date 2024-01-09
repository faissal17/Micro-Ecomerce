import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString({
        message: 'name must be a string',
    })
    @IsNotEmpty({ message: 'name must be not empty', })
    readonly name: string;

    @IsNumber({}, { message: 'price must be a number', })
    readonly price: number;

    @IsNotEmpty({ message: 'Image is required' })
    readonly image: string;

    @IsNotEmpty({ message: 'description must be not empty', })
    @IsString({ message: 'description must be a string', })
    readonly description: string;

    @IsNotEmpty({ message: 'Quantity bust be not empty' })
    @IsNumber({}, { message: 'Quantity must be a number', })
    readonly quantity: number;

    @IsNotEmpty({ message: 'UserId is required' })
    @IsNumber({}, { message: 'UserId must be a number', })
    readonly userId: number;

    @IsNumber({}, { message: 'CategoryId must be a number', })
    @IsNotEmpty({ message: 'CategoryId is required' })
    readonly categoryId: number;

    createdAt?: Date;
    updatedAt?: Date;
}
