import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TDATA> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  data: TDATA[];

  constructor(partial: Partial<PaginatedDto<TDATA>>) {
    Object.assign(this, partial);
  }
}
