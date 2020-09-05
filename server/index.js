const { startServer } = require('./api/index');
const { syncAndSeed } = require('./db/syncAndSeed');

const startApplication = async () => {
  await syncAndSeed({ force: false });
  await startServer();
};

startApplication();
