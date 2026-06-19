import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities';
import * as bcrypt from 'bcrypt';

const defaultAccounts: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    username: 'admin',
    email: 'admin@admin.admin',
    passwordHash: 'admin',
    role: 'admin',
    isActive: true,
  },
  {
    username: 'alice',
    email: 'alice@demo.com',
    passwordHash: 'alice123',
    role: 'user',
    isActive: true,
  },
  {
    username: 'baptiste',
    email: 'baptiste@demo.com',
    passwordHash: 'baptiste123',
    role: 'user',
    isActive: true,
  },
  {
    username: 'camille',
    email: 'camille@demo.com',
    passwordHash: 'camille123',
    role: 'user',
    isActive: true,
  },
  {
    username: 'dylan',
    email: 'dylan@demo.com',
    passwordHash: 'dylan123',
    role: 'user',
    isActive: true,
  },
];

@Injectable()
export class AccountService implements OnModuleInit {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaultAccounts();
  }

  create(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
    return this.accountRepository.save(account);
  }

  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  findOne(id: number): Promise<Account | null> {
    return this.accountRepository.findOneBy({ id });
  }

  update(id: number, account: Partial<Account>): Promise<Account | null> {
    this.accountRepository.update(id, account);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.accountRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async login(email: string, password: string): Promise<Account | null> {
    const account = await this.accountRepository.findOneBy({ email });
    if (!account) {
      return null;
    }
    // Simple password check (in production, use bcrypt)
    if (account.passwordHash !== password) {
      return null;
    }
    return account;
  }

  private async seedDefaultAccounts(): Promise<void> {
    const count = await this.accountRepository.count();
    if (count > 0) return;

    const hashedAccounts = await Promise.all(
      defaultAccounts.map(async (acc) => ({
        ...acc,
        passwordHash: await bcrypt.hash(acc.passwordHash, 10),
      })),
    );

    await this.accountRepository.save(hashedAccounts);
  }
}