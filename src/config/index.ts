import bodyParser from 'body-parser';
import cors from 'cors';
import routeApp from '../routes';
import { Application } from 'express';
import { errors } from 'celebrate';

import controller from '../controllers';

async function setUp(app: Application) {
  app.use(bodyParser.json());
  app.use(cors());
  routeApp(app);
  app.use(errors());
  await new controller().connect();
}

export default setUp;
