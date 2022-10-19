export class PaginatedDto<TDATA> {
  total: number;

  page: number;

  size: number;

  data: TDATA[];
}
