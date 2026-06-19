import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Chair } from '../entities/chair.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Chair)
    private ChairRepo: Repository<Chair>,
  ) {}

  // Récupère le panier de l'account, le crée s'il n'existe pas encore
  async getOrCreateCart(accountId: string): Promise<Cart> {
    let cart = await this.cartRepo.findOne({
      where: { account: { id: accountId } },
      relations: ['items', 'items.Chair'],
    });

    if (!cart) {
      cart = this.cartRepo.create({ account: { id: accountId } as any });
      cart = await this.cartRepo.save(cart);
      cart.items = [];
    }

    return cart;
  }

  async addItem(accountId: string, ChairId: string, quantity = 1): Promise<Cart> {
    const cart = await this.getOrCreateCart(accountId);

    const Chair = await this.ChairRepo.findOneBy({ id: ChairId });
    if (!Chair) throw new NotFoundException('Chaise introuvable');

    let item = cart.items.find((i) => i.Chair.id === ChairId);

    if (item) {
      item.quantity += quantity;
      await this.cartItemRepo.save(item);
    } else {
      item = this.cartItemRepo.create({ cart, Chair, quantity });
      await this.cartItemRepo.save(item);
    }

    return this.getOrCreateCart(accountId);
  }

  async updateItemQuantity(accountId: string, itemId: string, quantity: number): Promise<Cart> {
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

  async removeItem(accountId: string, itemId: string): Promise<Cart> {
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