import { Controller, Post, Body, Res, Req, UseGuards, Get } from '@nestjs/common';
import type { Response } from 'express'; // <- import type, requis par isolatedModules
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const account = await this.authService.register(dto.username, dto.email, dto.password);
    return { id: account.id, email: account.email };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const account = await this.authService.validateAccount(dto.email, dto.password);
    const token = this.authService.generateToken(account);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { id: account.id, email: account.email };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { success: true };
  }
  
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req) {
    return { id: req.user.id, email: req.user.email };
  }
}