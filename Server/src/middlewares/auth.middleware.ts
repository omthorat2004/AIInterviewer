import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_KEY = process.env.JWT_SECRET || 'supersecretkey';
if (!JWT_KEY) throw new Error('JWT_SECRET is not defined');

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization header missing or invalid' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, JWT_KEY) as { id: string; email: string };

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Unauthorized or token expired' });
  }
};

export default authMiddleware;
