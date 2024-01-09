import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
export declare class CategoriesService {
    private readonly Databaseservice;
    constructor(Databaseservice: DatabaseService);
    create(createCategoryDto: Prisma.CategoriesCreateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateCategoryDto: Prisma.CategoriesUpdateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
