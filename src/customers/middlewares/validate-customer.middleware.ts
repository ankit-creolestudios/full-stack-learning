import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('i am validate customer middleware');
    //middleware bearer token authrize

    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send({ error: 'no authorisation token provid' });
    }
    if (authorization === 'token') {
      next();
    } else {
      return res.status(403).send({ error: 'invalid authorization token' });
    }
  }
}
