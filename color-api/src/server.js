import express from 'express';
import os from 'os';

const app = express();

const port = 80;

const color = 'blue';
const hostName = os.hostname();
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
app.listen(port, () => {
  console.log(`serving is running on port ${port}`);
});
