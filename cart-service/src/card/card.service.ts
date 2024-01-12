import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CardService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createCardDto: CreateCardDto) {
    try {
      const cart = this.databaseService.cart.create({
        data: {
          ...createCardDto
        }
      });

      return cart
    } catch (error) {
      return error
    }
  }

  async findAll() {
    try {
      const cards = await this.databaseService.cart.findMany();

      return cards
    } catch (error) {
      return error
    }
  }

  async findOne(id: number) {
    try {
      const card = await this.databaseService.cart.findUnique({
        where: {
          id: id,
        }
      });

      return card
    } catch (err) {
      return err
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    try {
      const card = await this.databaseService.cart.update({
        where: {
          id: id,
        },
        data: {
          ...updateCardDto
        }
      });
    } catch (err) {
      return err
    }
  }

  async remove(id: number) {
    try {
      const card = await this.databaseService.cart.delete({
        where: {
          id: id,
        }
      });

      return card
    } catch (err) {
      return err
    }
  }
}
