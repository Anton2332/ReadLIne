import { CanActivate, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { GUID_MATCH } from 'src/modules/common/constants';
import { getDataFromObject } from 'src/modules/common/utils/guards.helper';

/**
 * This guard checks if ID is valid. If not providen throw 404. If not valid throw 400.
 * @config = { findIn: 'params' | 'body' }. Default: 'params'
 */

interface Prop {
  findIn?: 'params' | 'body' | 'query';
  field?: Array<string> | null;
}

export class CheckIdValidGuard implements CanActivate {
  constructor(private config: Prop) {}

  async canActivate(context: ExecutionContext) {
    const { findIn = 'params', field = ['id'] } = this.config;
    const request = context.switchToHttp().getRequest();
    const id = getDataFromObject(request[findIn], field);
    if (!id) {
      throw new HttpException('ID must be provided', HttpStatus.NOT_FOUND);
    }

    if (id.length !== 36) {
      throw new HttpException('ID must have 36 symbols', HttpStatus.BAD_REQUEST);
    }

    if (!id.match(GUID_MATCH)) {
      throw new HttpException('ID can contain only lowercase letters, numbers and -', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
