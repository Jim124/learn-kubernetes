import express from 'express';
const healthRouter = express.Router();

const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness =
  process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(`fail_liveness: ${fail_liveness}`);
console.log(`fail_readiness: ${fail_readiness}`);
healthRouter.get('/ready', (req, res) => {
  if (fail_readiness) {
    return res.status(503).send('Service is not available to serve');
  }
  return res.status(200).send('ok');
});

healthRouter.get('/up', (req, res) => {
  return res.status(200).send('ok');
});

healthRouter.get('/health', (req, res) => {
  if (fail_liveness) {
    return res.status(503).send('Service Unhealthy');
  }
  return res.status(200).send('ok');
});

export default healthRouter;
