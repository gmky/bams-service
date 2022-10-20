import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/database/entities';

export class LoginDto extends PickType(User, [
  'username',
  'password',
] as const) {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
