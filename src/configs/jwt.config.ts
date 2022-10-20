import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { IJwtConfig } from 'src/shared/configs';

@Injectable()
export class JwtFactory implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const jwtConfig = this.configService.get<IJwtConfig>('jwt');
    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiration.time,
      },
    };
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtConfig = configService.get<IJwtConfig>('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: !jwtConfig.expiration.enabled,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
