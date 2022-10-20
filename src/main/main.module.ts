import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtFactory } from 'src/configs';
import { AuthController } from './controllers';
import { UserService } from './services';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class MainModule {}
