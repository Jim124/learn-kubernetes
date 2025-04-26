import express from 'express';
import bodyParser from 'body-parser';
import rootRouter from './routes/root.js';
import healthRouter from './routes/health.js';
import apiRouter from './routes/api.js';
import mongoose from 'mongoose';
const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use('/', healthRouter);
app.use('/', rootRouter);

const port = 80;
const delay_startup = process.env.DELAY_STARTUP === 'true';
console.log(`Delay startup:${delay_startup}`);

if (delay_startup) {
  const start = Date.now();
  // purposefully block event loop and execution for 60 seconds.
  // to illustrate startup probes
  while (Date.now() - start < 60000) {}
}
await mongoose.connect(process.env.DB_URL);
console.log('connected to mongodb successfully');
app.listen(port, () => {
  console.log(`serving is running on port ${port}`);
});
