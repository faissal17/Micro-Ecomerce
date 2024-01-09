import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
export declare class ProductsService {
    private readonly databaseervice;
    constructor(databaseervice: DatabaseService);
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
    findOne(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: Prisma.ProductUpdateInput): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        price: number;
        description: string;
        categorieId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
