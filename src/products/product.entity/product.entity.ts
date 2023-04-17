import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column('longtext')
  description: string;

  @Column('longtext')
  image: string;

  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @Column()
  isactive: boolean;
}
