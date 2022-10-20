import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities';
import { LoginDto } from 'src/shared/dto/req';
import { UserDto } from 'src/shared/dto/res/user.dto';
import { UserRepository } from '../../database/repository/user.repository';

@Injectable()
export class UserService {
  private readonly log = new Logger(UserService.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepo.findAll();
  }

  async login(data: LoginDto): Promise<[user: User, token: string]> {
    const existedUser = await this.userRepo.findByUsername(data.username);
    if (data.password !== existedUser.password)
      throw new UnauthorizedException('Access denied');
    const token = this.jwtService.sign(existedUser);
    return [existedUser, token];
  }
}
