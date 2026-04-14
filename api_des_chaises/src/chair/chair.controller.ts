import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ChairService } from './chair.service';
import { Chair } from '../entities';

@Controller('chairs')
export class ChairController {
  constructor(private readonly chairService: ChairService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createChairDto: Omit<Chair, 'id'>): Promise<Chair> {
    return this.chairService.create(createChairDto);
  }

  @Get()
  async findAll(): Promise<Chair[]> {
    return this.chairService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Chair> {
    const chair = await this.chairService.findOne(Number(id));
    if (!chair) {
      throw new NotFoundException(`Chaise avec l'ID ${id} non trouvée`);
    }
    return chair;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChairDto: Partial<Chair>,
  ): Promise<Chair> {
    const updatedChair = await this.chairService.update(Number(id), updateChairDto);
    if (!updatedChair) {
      throw new NotFoundException(`Chaise avec l'ID ${id} non trouvée`);
    }
    return updatedChair;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const success = await this.chairService.remove(Number(id));
    if (!success) {
      throw new NotFoundException(`Chaise avec l'ID ${id} non trouvée`);
    }
  }
}
