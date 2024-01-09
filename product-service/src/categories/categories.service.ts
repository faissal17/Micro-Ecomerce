import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly Databaseservice: DatabaseService) {}
  async create(createCategoryDto: Prisma.CategoriesCreateInput) {
    return this.Databaseservice.categories.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.Databaseservice.categories.findMany();
  }

  async findOne(id: number) {
    return this.Databaseservice.categories.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCategoryDto: Prisma.CategoriesUpdateInput) {
    return this.Databaseservice.categories.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.Databaseservice.categories.delete({
      where: {
        id,
      },
    });
  }
}
