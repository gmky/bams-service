import { ApiProperty } from '@nestjs/swagger';

export class OkDto {
  @ApiProperty()
  message?: string;
}
