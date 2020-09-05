const { startServer } = require('./api/index');
const { syncDB } = require('./db/syncDB');

const startApplication = async () => {
  await syncDB({ force: false });
  await startServer();
};

startApplication();
