import bcrypt from 'bcrypt';
import JsonWebToken from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Joi, celebrate } from 'celebrate';
import { JWT_SECRET, JWT_HEADER } from '../../config/loadEnv';

import { UserModel } from '../../models/User';

export async function createUser(request: Request, response: Response) {
  const { name, mail, password } = request.body;
  const prevUser = await UserModel.findOne({ where: { mail } });
  if (prevUser) return response.status(409).send(`mail ${mail} already registered`);

  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);

  UserModel.create({ name, mail, password: encryptedPassword, creationDate: new Date() });
  return response.status(201).send(`User ${name}, mail ${mail} created`);
}

export async function loginUser(request: Request, response: Response) {
  const { mail, password } = request.body;
  const user = await UserModel.findOne({ where: { mail } });
  if (!user) return response.status(409).send(`Unregistered mail ${mail}`);

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) response.status(401).send('Incorrect password');

  const sessionJWT = JsonWebToken.sign({ name: user.name, mail: user.mail }, JWT_SECRET);
  response.header(JWT_HEADER, sessionJWT);

  return response.send('Login successful');
}

export const createUserDataValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(6).max(20).required(),
    mail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
});

export const loginUserDataValidation = celebrate({
  body: Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
});
