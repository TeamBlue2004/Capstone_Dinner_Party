const chalk = require('chalk');
const { db } = require('./db');
const { seedInitialData } = require('./Data/seed');

const syncAndSeed = async ({ force = false }) => {
  console.log(chalk.red(`Force = ${force}`));
  try {
    await db.sync({ force });
    console.log(chalk.greenBright('DataBase synced successfully.'));
    if (force) {
      await seedInitialData({ force });
    }
  } catch (e) {
    console.log(chalk.red('Database failed to sync!'));
    throw e;
  }
};

module.exports = {
  syncAndSeed,
};
