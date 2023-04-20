import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: [{ email: username }],
      relations: { type: true },
    });
  }

  async createUser(user: UserEntity) {
    if (user.password) {
      const password = user.password;
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      user.password = hash;
    }
    return await this.usersRepository.save(user);
  }

  async updateUser(id: number, user: UserEntity) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({
      where: [{ id: id }],
      relations: { type: true },
    });
  }

  async deleteUser(user: UserEntity) {
    this.usersRepository.delete(user);
  }

  async saveorupdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshtokenexpires: Date,
  ) {
    await this.usersRepository.update(id, {
      refreshToken: refreshToken,
      refreshTokenExpires: refreshtokenexpires,
    });
  }
}
