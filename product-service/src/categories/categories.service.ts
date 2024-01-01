import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly Databaseservice: DatabaseService) {}
  create(createCategoryDto: Prisma.CategoriesCreateInput) {
    return this.Databaseservice.categories.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.Databaseservice.categories.findMany();
  }

  findOne(id: number) {
    return this.Databaseservice.categories.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: Prisma.CategoriesUpdateInput) {
    return this.Databaseservice.categories.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.Databaseservice.categories.delete({
      where: {
        id,
      },
    });
  }
}
