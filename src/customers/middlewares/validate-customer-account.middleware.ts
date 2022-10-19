import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export class ValidateCustomerAcountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('i am validate customer middleware');
    //middleware bearer token authrize

    const { valid } = req.headers;
    if (valid) {
      next();
    } else {
      return res.status(401).send({ error: 'account is invalid' });
    }
  }
}
