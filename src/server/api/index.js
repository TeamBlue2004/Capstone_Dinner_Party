import chalk from 'chalk';
import dotenv from 'dotenv';

const expressMiddleware = require('./middleware');
const app = require('./server');

dotenv.config();

const PORT = process.env.PORT || 3000;

expressMiddleware();

app.get('/health', (req, res) => {
  res.send({
    message: 'I am healthy.',
  });
});

const startServer = () => {
  return new Promise((res) => {
    app.listen(PORT, () => {
      console.log(chalk.green(`App is now listening to PORT:${PORT}`));
    });
    res();
  });
};

module.exports = {
  startServer,
  app,
};
