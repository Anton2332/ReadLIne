import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TrimMiddleware implements NestMiddleware {
  cleanObject(obj) {
    if (!obj) {
      return obj;
    }
    this.trim(obj);
    return obj;
  }

  private trim(values) {
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        }
      }
    });
    return values;
  }

  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  use(req: Request, res: Response, next: NextFunction) {
    req.query = this.cleanObject(req.query);
    req.params = this.cleanObject(req.params);
    if (req.method !== 'GET') {
      req.body = this.cleanObject(req.body);
    }
    next();
  }
}
