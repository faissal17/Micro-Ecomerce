import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      const product = await this.productsService.create(createProductDto);

      if (!product)
        throw new HttpException('Product creation failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Product successfully created',
        data: product,
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
  async findAll() {
    try {
      const products = await this.productsService.findAll();

      if (!products || products.data.length === 0) {
        throw new HttpException('No products found', HttpStatus.NOT_FOUND);
      }

      return {
        status: HttpStatus.OK,
        message: 'Products successfully fetched',
        data: products.data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.findOne(id);

      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product successfully fetched',
        data: product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.update(id, updateProductDto);

      if (!product)
        throw new HttpException('Product update failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product successfully updated',
        data: product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      });
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
    })) id: number,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.remove(id);

      if (!product)
        throw new HttpException('Product deletion failed', HttpStatus.BAD_REQUEST);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product successfully deleted',
        data: product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message,
        data: error,
      });
    }
  }
}
