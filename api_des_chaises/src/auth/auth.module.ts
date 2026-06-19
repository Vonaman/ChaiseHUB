// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // mets une vraie valeur secrète en .env
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule], // pour que CartModule puisse réutiliser JwtService si besoin
})
export class AuthModule {}