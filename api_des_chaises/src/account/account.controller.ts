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
import { AccountService } from './account.service';
import { Account } from '../entities';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAccountDto: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Account> {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account> {
    const account = await this.accountService.findOne(Number(id));
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
    const updatedAccount = await this.accountService.update(Number(id), updateAccountDto);
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