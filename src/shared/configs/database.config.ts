export interface IDatabaseConfig {
  type: 'mysql' | 'postgres';

  host: string;

  port: number;

  user: string;

  pass: string;

  name: string;
}
