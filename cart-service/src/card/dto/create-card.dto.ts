import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardDto {
    @IsNumber({ allowNaN: false, allowInfinity: false })
    readonly productId: number;

    @IsNotEmpty({ message: 'Quantity is required' })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    readonly quantity: number;

    @IsNotEmpty({ message: 'User ID is required' })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    readonly userId: number;

    @IsNotEmpty({ message: 'Product name is required' })
    @IsNumber({ allowNaN: false, allowInfinity: false })
    readonly priceTotal: number;
}
