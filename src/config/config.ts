import express from 'express';
// @ts-ignore
import consign from 'consign';
import bodyParser from 'body-parser';

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());

  consign({ extensions: ['.js', '.json', '.node', '.ts'] })
    .include('/src/controllers')
    .into(app);

  return app;
};
