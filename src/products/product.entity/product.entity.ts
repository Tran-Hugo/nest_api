import { CategoryEntity } from 'src/categories/category.entity/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

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

  @ManyToOne((type) => CategoryEntity, (cat) => cat.id)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @Column()
  isactive: boolean;
}
