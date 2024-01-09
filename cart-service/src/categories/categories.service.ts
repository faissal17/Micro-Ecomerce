import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.databaseService.categories.create({
        data: {
          ...createCategoryDto,
        },
      });
      return category;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const categories = await this.databaseService.categories.findMany();
      return categories;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.databaseService.categories.findUnique({
        where: {
          id,
        },
      });
      return category;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const existingCategory = await this.databaseService.categories.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const updatedCategory = await this.databaseService.categories.update({
        where: { id },
        data: { ...updateCategoryDto },
      });

      return updatedCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const existingCategory = await this.databaseService.categories.findUnique({
        where: { id },
      });

      if (!existingCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const deletedCategory = await this.databaseService.categories.delete({
        where: { id },
      });

      return {
        status: HttpStatus.OK,
        message: 'Category successfully deleted',
        data: deletedCategory,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
