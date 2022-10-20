import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/database/entities';

export class UserDto extends OmitType(User, ['password', 'salt'] as const) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude({ toPlainOnly: true })
  name: string;
}
