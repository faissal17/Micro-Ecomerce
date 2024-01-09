import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: Prisma.ProductCreateInput): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findProductByName(name: string): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        message: string;
    }>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: Prisma.ProductUpdateInput): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
