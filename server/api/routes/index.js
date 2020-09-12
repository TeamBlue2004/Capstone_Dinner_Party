const { app } = require('../server');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');
const { userRouter } = require('./users');

const routes = [recipesRouter, ingredientsRouter, userRouter];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
