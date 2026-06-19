import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Chair } from './chair.entity';




@Entity()
export class CartItem {
  @PrimaryGeneratedColumn() // <- number, pas uuid, pour rester cohérent avec Account/Chair
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Chair)
  chair: Chair;

  @Column({ default: 1 })
  quantity: number;
}