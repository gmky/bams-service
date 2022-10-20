import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly log = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userEntity.find();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userEntity.findOneBy({ username });
  }
}
