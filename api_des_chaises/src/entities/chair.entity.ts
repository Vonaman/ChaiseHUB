import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chairs')
export class Chair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('text')
  fullDescription: string;

  @Column('simple-array')
  features: string[];

  @Column('json')
  specs: Record<string, string>;

  @Column({ default: 0 })
  reviews: number;
}
