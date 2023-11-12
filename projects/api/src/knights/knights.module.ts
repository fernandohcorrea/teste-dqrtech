import { Module } from '@nestjs/common';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Knight,
  KnightSchema,
} from 'src/databases/dqrtech/schemas/knight.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Knight.name, schema: KnightSchema }],
      'dqrtech',
    ),
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
