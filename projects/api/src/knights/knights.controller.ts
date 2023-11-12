import { CreateKnightsDto } from './dtos/create-knights.dto';
import { UpdateKnightsDto } from './dtos/update-knights.dto';
import { FilterInterface } from './interfaces/filter-interface';
import { KnightsService } from './knights.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createKnightsDto: CreateKnightsDto) {
    return await this.knightsService.create(createKnightsDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() filter: FilterInterface) {
    return await this.knightsService.find(filter);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string) {
    const filter: FilterInterface = { _id: id };
    return await this.knightsService.find(filter);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() updateKnightsDto: UpdateKnightsDto,
  ) {
    return await this.knightsService.update(id, updateKnightsDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  public async delete(@Param('id') id: string) {
    return await this.knightsService.delete(id);
  }
}
