import express from 'express';
import { getHostName } from '../utils.js';
import { getColor } from '../db/color.js';

const rootRouter = express.Router();
rootRouter.get('/', (req, res) => {
  const { colorKey } = req.query;
  const color = getColor({ key: colorKey });
  const hostName = getHostName();
  res.send(
    `<h1 style="color:${color}">hello from kubernetes,hostname:${hostName}</h1>`
  );
});
export default rootRouter;
