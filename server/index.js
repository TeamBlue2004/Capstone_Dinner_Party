require('dotenv').config();

const { startServer } = require('./api/index');

const startApplication = async () => {
  await startServer();
};

startApplication();
