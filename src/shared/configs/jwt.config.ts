export interface IJwtConfig {
  secret: string;

  expiration: {
    enabled: boolean;

    time: string;
  };
}
