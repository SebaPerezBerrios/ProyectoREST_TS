import { Application } from 'express';
import auth from './auth';
import psuRoutes from './psuRoutes';

export function routeApp(app: Application) {
  app.use(auth);
  app.use(psuRoutes);
}

export default routeApp;
