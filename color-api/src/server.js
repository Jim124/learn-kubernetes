import express from 'express';

const app = express();

const port = 80;

app.get('/', (req, res) => {
  res.send(`<h1 style="color:blue">hello from kubenetes</h1>`);
});

app.listen(port, () => {
  console.log(`serving is running on port ${port}`);
});
