import express from 'express';
import { getColor, getHostName } from '../utils.js';
const apiRouter = express.Router();
apiRouter.get('/', (req, res) => {
  const color = getColor();
  const hostName = getHostName();
  const { format } = req.query;
  if (format === 'json') {
    return res.json({ color, hostName });
  }
  res.send(`{color:${color},hostname:${hostName}}`);
});
export default apiRouter;
