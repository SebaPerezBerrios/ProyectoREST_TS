import dotenv from 'dotenv';
const env = dotenv.config();
if (env.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
export const ADDRESS = process.env.ADDRESS ? process.env.ADDRESS : 'localhost';
export const PROTOCOL = process.env.PROTOCOL ? process.env.PROTOCOL : 'http';

if (!process.env.JWT_SECRET) {
  throw new Error("⚠️  Couldn't find JsonWebToken ⚠️");
}
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_HEADER = process.env.JWT_HEADER ? process.env.JWT_HEADER : 'jwt-auth';
