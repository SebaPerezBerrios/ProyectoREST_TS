import express from 'express';

import config from './config';

const app = express();

config(app);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
