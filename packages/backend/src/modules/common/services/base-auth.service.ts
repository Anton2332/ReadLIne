import { JwtService } from '@nestjs/jwt';
import { TokenDTO } from 'src/modules/common/dtos';
import { EAppRoles, IJWTPayload } from 'src/modules/common/types';

export class BaseAuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(id: string, role: EAppRoles): Promise<TokenDTO | null> {
    try {
      const payload: IJWTPayload = {
        id,
        role: [role]
      };

      const accessToken = this.jwtService.sign(payload, {
        privateKey: process.env.JWT_SECRET
      });

      return { token: accessToken };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
