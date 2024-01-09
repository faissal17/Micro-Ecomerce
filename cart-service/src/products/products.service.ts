import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.databaseService.products.create({
        data: {
          name: createProductDto.name,
          image: createProductDto.image,
          price: createProductDto.price,
          description: createProductDto.description,
          quantity: createProductDto.quantity,
          userId: createProductDto.userId,
          categoryId: createProductDto.categoryId,
          createdAt: createProductDto.createdAt,
          updatedAt: createProductDto.updatedAt,
        },
      });

      if (!product)
        throw new HttpException('Add a new product creation failed', HttpStatus.BAD_REQUEST);
      return {
        status: HttpStatus.CREATED,
        message: 'Product successfully created',
        data: product,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const products = await this.databaseService.products.findMany();

      if (!products || products.length === 0) {
        throw new HttpException('No products found', HttpStatus.NOT_FOUND);
      }

      return {
        status: HttpStatus.OK,
        message: 'Products successfully fetched',
        data: products,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.products.findUnique({
        where: {
          id: id,
        },
      });

      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

      return {
        status: HttpStatus.OK,
        message: 'Product successfully fetched',
        data: product,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        data: error,
      };
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.databaseService.products.update({
        where: {
          id: id,
        },
        data: {
          name: updateProductDto.name,
          image: updateProductDto.image,
          price: updateProductDto.price,
          description: updateProductDto.description,
          quantity: updateProductDto.quantity,
          userId: updateProductDto.userId,
          categoryId: updateProductDto.categoryId,
          createdAt: updateProductDto.createdAt,
          updatedAt: updateProductDto.updatedAt,
        },
      });

      if (!product)
        throw new HttpException('Product update failed', HttpStatus.BAD_REQUEST);

      return {
        status: HttpStatus.OK,
        message: 'Product successfully updated',
        data: product,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        data: error,
      };
    }
  }

  async remove(id: number) {
    try {
      const product = await this.databaseService.products.delete({
        where: {
          id: id,
        },
      });

      if (!product)
        throw new HttpException('Product deletion failed', HttpStatus.BAD_REQUEST);

      return {
        status: HttpStatus.OK,
        message: 'Product successfully deleted',
        data: product,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
        data: error,
      };
    }
  }
}
