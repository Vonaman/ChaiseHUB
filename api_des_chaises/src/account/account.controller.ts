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
  BadRequestException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from '../entities';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: { email: string; passwordHash: string },
  ): Promise<Omit<Account, 'passwordHash'>> {
    const account = await this.accountService.login(
      loginDto.email,
      loginDto.passwordHash,
    );
    if (!account) {
      throw new BadRequestException('Email ou mot de passe incorrect');
    }
    // Ne pas retourner le mot de passe
    const { passwordHash, ...result } = account;
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAccountDto: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Omit<Account, 'passwordHash'>> {
    try {
      const account = await this.accountService.create(createAccountDto);
      // Ne pas retourner le mot de passe
      const { passwordHash, ...result } = account;
      return result;
    } catch (error: any) {
      // Gestion des erreurs de contrainte unique PostgreSQL
      if (error.code === '23505') {
        const detail = error.detail || error.message || '';
        if (detail.includes('email')) {
          throw new BadRequestException('Cet email est déjà utilisé');
        }
        if (detail.includes('username')) {
          throw new BadRequestException('Ce nom d\'utilisateur est déjà utilisé');
        }
        throw new BadRequestException('Cette valeur est déjà utilisée');
      }
      // Gestion des erreurs de contrainte unique MySQL (fallback)
      if (error.code === 'ER_DUP_ENTRY' || error.message?.includes('UNIQUE constraint failed')) {
        if (error.message?.includes('email')) {
          throw new BadRequestException('Cet email est déjà utilisé');
        }
        if (error.message?.includes('username')) {
          throw new BadRequestException('Ce nom d\'utilisateur est déjà utilisé');
        }
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account> {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      throw new BadRequestException(`ID invalide: ${id}`);
    }
    const account = await this.accountService.findOne(numId);
    if (!account) {
      throw new NotFoundException(`Compte avec l'ID ${id} non trouvé`);
    }
    return account;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: Partial<Account>,
  ): Promise<Account> {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      throw new BadRequestException(`ID invalide: ${id}`);
    }
    const updatedAccount = await this.accountService.update(numId, updateAccountDto);
    if (!updatedAccount) {
      throw new NotFoundException(`Compte avec l'ID ${id} non trouvé`);
    }
    return updatedAccount;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const success = await this.accountService.remove(Number(id));
    if (!success) {
      throw new NotFoundException(`Compte avec l'ID ${id} non trouvé`);
    }
  }
}