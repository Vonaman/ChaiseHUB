import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Account } from './account.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Account, (account) => account.cart, { onDelete: 'CASCADE' })
  @JoinColumn()
  account: Account;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];
}