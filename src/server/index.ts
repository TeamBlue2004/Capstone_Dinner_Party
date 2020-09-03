const { startServer } = require('./api/index.js');

const startApplication = async () => {
  await startServer();
}

startApplication();
