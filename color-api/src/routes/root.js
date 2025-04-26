import express from 'express';
import { getColor, getHostName } from '../utils.js';

const rootRouter = express.Router();
rootRouter.get('/', (req, res) => {
  const color = getColor();
  const hostName = getHostName();
  res.send(
    `<h1 style="color:${color}">hello from kubernetes,hostname:${hostName}</h1>`
  );
});
export default rootRouter;
