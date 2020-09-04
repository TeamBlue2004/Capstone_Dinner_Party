const chalk = require('chalk');
const { app } = require('./server');
const applyMiddleware = require('./middleware');

const PORT = process.env.PORT || 3000;

applyMiddleware();

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
