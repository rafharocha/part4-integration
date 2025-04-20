import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, 
  duration: 60,
});


export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientIp = req.ip || 'unknown';
    await rateLimiter.consume(clientIp);
    next();
  } catch (error) {
    res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }
};