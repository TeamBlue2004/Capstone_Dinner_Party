const { app } = require('../server');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');

const routes = [recipesRouter, ingredientsRouter];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
