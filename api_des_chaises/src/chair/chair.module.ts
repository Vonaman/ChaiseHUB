import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChairService } from './chair.service';
import { ChairController } from './chair.controller';
import { Chair } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Chair])],
  controllers: [ChairController],
  providers: [ChairService],
  exports: [ChairService],
})
export class ChairModule {}
