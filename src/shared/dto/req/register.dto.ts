import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/database/entities';

export class RegisterDto extends PickType(User, [
  'email',
  'name',
  'password',
  'username',
] as const) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;
}
