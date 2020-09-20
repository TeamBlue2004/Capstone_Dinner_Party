const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { app } = require('./server');
const applyMiddleware = require('./middleware');
const { initRoutes } = require('./routes/index');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

initRoutes();
applyMiddleware();

app.get('/health', (req, res) => {
  res.send({
    message: 'I am healthy.',
  });
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
