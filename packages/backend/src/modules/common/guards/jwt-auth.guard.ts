import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

/**
 * @param  {JWTAuthGuard} This guard checks user token and verify him
 */

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private jwtService: JwtService) {
    this.jwtService = new JwtService({
      secret: this.configService.get<string>('JWT_SECRET')
    });
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Remove 'Bearer' from token
    const token = request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const userData = this.jwtService.verify(token);
      if (!userData) {
        return false;
      }
      request.userData = userData;
    } catch (e) {
      return false;
    }
    return true;
  }
}
