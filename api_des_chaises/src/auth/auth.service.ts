import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Account } from '../entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string): Promise<Account> {
    const existing = await this.accountRepo.findOneBy({ email });
    if (existing) throw new ConflictException('Email déjà utilisé');

    const passwordHash = await bcrypt.hash(password, 10);
    const account = this.accountRepo.create({ username, email, passwordHash });
    return this.accountRepo.save(account);
  }

  async validateAccount(email: string, password: string): Promise<Account> {
    const account = await this.accountRepo.findOneBy({ email });
    if (!account) throw new UnauthorizedException('Identifiants invalides');

    const match = await bcrypt.compare(password, account.passwordHash);
    if (!match) throw new UnauthorizedException('Identifiants invalides');

    return account;
  }

  generateToken(account: Account): string {
    return this.jwtService.sign({ sub: account.id, email: account.email });
  }
}