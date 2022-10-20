import { Controller, Get, Logger } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse, Public } from 'src/shared/decors';
import { PaginatedDto } from 'src/shared/dto';
import { UserDto } from 'src/shared/dto/res/user.dto';
import { UserService } from '../services';

@ApiExtraModels(UserDto)
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly log = new Logger(AuthController.name);

  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiPaginatedResponse(UserDto)
  @Get('/login')
  async login(): Promise<PaginatedDto<UserDto>> {
    this.log.debug('REST - /api/auth/login');
    const result = await this.userService.findAll();
    return new PaginatedDto({ data: result });
  }
}
