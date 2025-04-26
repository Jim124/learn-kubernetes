import express from 'express';
import { getHostName } from '../utils.js';
import { getColor } from '../db/color.js';
const apiRouter = express.Router();
apiRouter.get('/', (req, res) => {
  const hostName = getHostName();

  const { format, colorKey } = req.query;
  const color = getColor({ key: colorKey });
  if (format === 'json') {
    return res.json({ color, hostName });
  }
  res.send(`{color:${color},hostname:${hostName}}`);
});
export default apiRouter;
