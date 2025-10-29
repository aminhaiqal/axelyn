import { Injectable, NestMiddleware } from '@nestjs/common';
import { rateLimit } from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

/**
 * Basic rate limiting middleware
 * Limits requests per IP to prevent abuse
 */
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 30, // max 30 requests per window per IP
    standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
    message: {
      statusCode: 429,
      errors: { rate_limit: 'Too many requests, please try again later.' },
    },
    keyGenerator: (req: Request) => {
      // You can change this to use user_id if authenticated
      return req.ip;
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    return this.limiter(req, res, next);
  }
}
