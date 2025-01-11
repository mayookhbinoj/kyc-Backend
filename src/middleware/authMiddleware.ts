import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import configKeys from "../utils/Configure";

declare global {
    namespace Express {
      interface Request {
        user?: { 
          id: string;
          role: string;
        };
      }
    }
}

interface CustomJwtPayload extends jwt.JwtPayload {
  role: string;
  id: string;
}

export const authorize = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send('Access denied');
      return;
    }
    try {
      let result=configKeys.JWT_SECRET_KEY
      const decoded = jwt.verify(token, result) as CustomJwtPayload;
      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).send('Access denied');
        return;
      }
      
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};