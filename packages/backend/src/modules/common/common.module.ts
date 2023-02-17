import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthGuard } from 'src/modules/common/guards/jwt-auth.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],

  providers: [ConfigModule, ConfigService, JWTAuthGuard],
  exports: [JwtModule, ConfigModule, ConfigService, JWTAuthGuard, ConfigService]
})
export class CommonModule {}
