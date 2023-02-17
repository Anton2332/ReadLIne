import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  async start() {
    return 'Glory to Ukraine!';
  }
}
