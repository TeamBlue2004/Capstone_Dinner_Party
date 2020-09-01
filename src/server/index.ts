import express from 'express';
import path from 'path';
import chalk from 'chalk';

const app = express();

const PORT = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

app.use(express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

app.get('/health', (req, res) => {
  res.send({
    message: 'I am healthy.',
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Application listening on PORT:${PORT}`));
});
