import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Chair } from '../entities/chair.entity';
import { Account } from '../entities';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Chair)
    private chairRepo: Repository<Chair>,
  ) {}

  async getOrCreateCart(accountId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { account: { id: accountId } },
      relations: ['items', 'items.chair'],
    });

    if (!cart) {
      cart = this.cartRepo.create({ account: { id: accountId } as Account });
      cart = await this.cartRepo.save(cart);
      cart.items = [];
    }

    return cart;
  }

  async addItem(accountId: number, chairId: number, quantity = 1): Promise<Cart> {
    const cart = await this.getOrCreateCart(accountId);

    const chair = await this.chairRepo.findOneBy({ id: chairId });
    if (!chair) throw new NotFoundException('Chaise introuvable');

    let item = cart.items.find((i) => i.chair.id === chairId);

    if (item) {
      item.quantity += quantity;
      await this.cartItemRepo.save(item);
    } else {
      item = this.cartItemRepo.create({ cart, chair, quantity });
      await this.cartItemRepo.save(item);
    }

    return this.getOrCreateCart(accountId);
  }

  async updateItemQuantity(accountId: number, itemId: number, quantity: number): Promise<Cart> {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
      relations: ['cart', 'cart.account'],
    });

    if (!item || item.cart.account.id !== accountId) {
      throw new NotFoundException('Item introuvable');
    }

    item.quantity = quantity;
    await this.cartItemRepo.save(item);

    return this.getOrCreateCart(accountId);
  }

  async removeItem(accountId: number, itemId: number): Promise<Cart> {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
      relations: ['cart', 'cart.account'],
    });

    if (!item || item.cart.account.id !== accountId) {
      throw new NotFoundException('Item introuvable');
    }

    await this.cartItemRepo.remove(item);

    return this.getOrCreateCart(accountId);
  }
}