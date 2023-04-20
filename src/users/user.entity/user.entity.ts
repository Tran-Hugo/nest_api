import { TypeUser } from 'src/typeusers/typeuser.entity/typeuser.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  firstname: string;

  @Column({ length: 45 })
  lastname: string;

  @Column({ length: 45 })
  phone: string;

  @Column({ length: 250 })
  email: string;

  @Column({ length: 250 })
  password: string;

  @ManyToOne((type) => TypeUser, (role) => role.id)
  @JoinColumn({ name: 'type' })
  type: TypeUser;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpires: Date;
}
