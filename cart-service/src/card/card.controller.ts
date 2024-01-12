import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Post()
  async create(@Res() res: Response, @Body() createCardDto: CreateCardDto) {
    try {
      const card = await this.cardService.create(createCardDto);

      return res.status(200).json({
        message: 'Card created successfully',
        card
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating card',
        error
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const cards = await this.cardService.findAll();

      return res.status(200).json({
        message: 'Cards retrieved successfully',
        cards
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving cards',
        error
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    })) id: number,
    @Res() res: Response,
  ) {
    try {
      const card = await this.cardService.findOne(id);

      return res.status(200).json({
        message: 'Card retrieved successfully',
        card
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving card',
        error
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    })) id: number,
    @Body() updateCardDto: UpdateCardDto,
    @Res() res: Response,
  ) {
    try {
      const card = await this.cardService.update(id, updateCardDto);

      return res.status(200).json({
        message: 'Card updated successfully',
        card
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating card',
        error
      });
    }
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
    })) id: number,
    @Res() res: Response,
  ) {
    try {
      const card = this.cardService.remove(+id);

      return res.status(200).json({
        message: 'Card deleted successfully',
        card
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Error deleting card',
        err
      });
    }
  }
}
