import express from 'express';
import os from 'os';
import fs from 'fs';
import path from 'path';
const app = express();

const port = 80;

const getColor = () => {
  let color = process.env.DEFAULT_COLOR;
  const filePath = process.env.COLOR_PATH;
  if (filePath) {
    try {
      const colorFromFile = fs.readFileSync(path.resolve(filePath), 'utf8');
      color = colorFromFile.trim();
    } catch (error) {
      console.error(`Failed to read content of ${filePath}`);
      console.error(error);
    }
  }
  return color || 'blue';
};

const color = getColor();
const hostName = os.hostname();
const delay_startup = process.env.DELAY_STARTUP === 'true';
const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness =
  process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(
  `Delay startup:${delay_startup}, fail_liveness: ${fail_liveness}, fail_readiness: ${fail_readiness}`
);
app.get('/', (req, res) => {
  res.send(`<h1 style="color:${color}">hello from kubernetes</h1>`);
});

app.get('/api', (req, res) => {
  const { format } = req.query;
  if (format === 'json') {
    return res.json({ color, hostName });
  }
  res.send(`{color:${color},hostname:${hostName}}`);
});

app.get('/ready', (req, res) => {
  if (fail_readiness) {
    return res.status(503).send('Service is not available to serve');
  }
  return res.status(200).send('ok');
});
app.get('/up', (req, res) => {
  return res.status(200).send('ok');
});
app.get('/health', (req, res) => {
  if (fail_liveness) {
    return res.status(503).send('Service Unhealthy');
  }
  return res.status(200).send('ok');
});
if (delay_startup) {
  const start = Date.now();
  // purposefully block event loop and execution for 60 seconds.
  // to illustrate startup probes
  while (Date.now() - start < 60000) {}
}
app.listen(port, () => {
  console.log(`serving is running on port ${port}`);
});
