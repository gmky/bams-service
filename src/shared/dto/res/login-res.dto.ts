import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/database/entities';

export class LoginResDto extends PickType(User, [
  'id',
  'name',
  'username',
  'email',
]) {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}
