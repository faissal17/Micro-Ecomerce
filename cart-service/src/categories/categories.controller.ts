import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
    try {
      const category = await this.categoriesService.create(createCategoryDto);

      if (!category)
        throw new HttpException('Category creation failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Category successfully created',
        data: category,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      })
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findAll();

      if (!categories)
        throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Categories successfully retrieved',
        data: categories,
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: error.message,
        data: error,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Res() res: Response) {
    try {
      const category = await this.categoriesService.findOne(+id);

      if (!category)
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Category successfully retrieved',
        data: category,
      });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: error.message,
        data: error,
      });
    }
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response) {
    try {
      const category = await this.categoriesService.update(+id, updateCategoryDto);

      if (!category)
        throw new HttpException('Category update failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Category successfully updated',
        data: category,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      })
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_FOUND
    })) id: number,
    @Res() res: Response) {
    try {
      const category = await this.categoriesService.remove(+id);

      if (!category)
        throw new HttpException('Category deletion failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Category successfully deleted',
        data: category,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      })
    }
  }
}
