const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User, Session } = require('../db/Models/index');
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

const findUserBySession = (sessionId) =>
  User.findOne({
    include: [
      {
        model: Session,
        where: {
          id: sessionId,
        },
      },
    ],
  });

app.use(async (req, res, next) => {
  if (!req.cookies.session_id) {
    const session = await Session.create();

    const oneWeek = 1000 * 60 * 60 * 24 * 7;

    res.cookie('session_id', session.id, {
      path: '/',
      expires: new Date(Date.now() + oneWeek),
    });

    req.session_id = session.id;

    next();
  } else {
    req.session_id = req.cookies.session_id;
    const user = await findUserBySession(req.session_id);

    if (user) {
      req.user = user;
    }

    next();
  }
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
