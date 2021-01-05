import JsonWebToken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET, JWT_HEADER } from '../../config/loadEnv';

const checkJWTAuth = (request: Request, response: Response, next: NextFunction) => {
  const token = request.header(JWT_HEADER);
  if (!token) return response.status(401).send(`missing ${JWT_HEADER} header`);

  try {
    JsonWebToken.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    response.status(401).send('JWT mismatch');
  }
};

export default checkJWTAuth;
