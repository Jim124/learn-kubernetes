import express from 'express';
import { getHostName } from '../utils.js';
import { getColor, getColors, saveColor, deleteColor } from '../db/color.js';
const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
  const hostName = getHostName();

  const { format, colorKey } = req.query;
  const color = await getColor({ key: colorKey });
  if (format === 'json') {
    return res.json({ color, hostName });
  }
  res.send(`color:${color},hostname:${hostName}`);
});
apiRouter.get('/colors', async (req, res) => {
  const colors = await getColors();
  return res.status(200).json({ data: colors });
});
apiRouter.get('/colors/:key', async (req, res) => {
  const { key } = req.params;
  const color = await getColor({ key, strict: true });
  if (color === undefined) {
    return res.status(404).json({ msg: 'could not find color' });
  }
  return res.status(200).json({ data: color });
});

apiRouter.post('/colors', async (req, res) => {
  const { key, value } = req.body;
  await saveColor({ key, value });
  return res.status(201).json({ data: { key, value } });
});

apiRouter.put('/colors/:key', async (req, res) => {
  const { key } = req.params;
  const color = await getColor({ key, strict: true });
  if (color === undefined) {
    return res.status('404').json({ msg: 'could not find color' });
  }
  await saveColor(req.body);
  return res.status(200).json({ msg: 'update successfully' });
});
apiRouter.delete('/colors/:key', async (req, res) => {
  const { key } = req.params;
  await deleteColor({ key });
  return res.status(204).json({ msg: 'delete key successfully' });
});
export default apiRouter;
