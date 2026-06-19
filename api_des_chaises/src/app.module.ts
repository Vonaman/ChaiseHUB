import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChairModule } from './chair';
import { AccountModule } from './account';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ChairModule, AccountModule, CartModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
