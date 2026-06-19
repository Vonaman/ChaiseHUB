import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChairModule } from './chair';
import { CartModule } from './cart/cart.module';
import { AccountModule } from './account';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ChairModule, AccountModule, CartModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
