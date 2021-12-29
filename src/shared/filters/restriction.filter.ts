import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { AgeRestrictionException } from '../exceptions/age-restriction.exception';

@Catch(AgeRestrictionException)
export class RestrictionFilter implements ExceptionFilter {
  catch(exception: AgeRestrictionException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response
      .status(403)
      .json({
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Age should be greater than 20',
        originalMessage: exception.message
      });
  }
}
