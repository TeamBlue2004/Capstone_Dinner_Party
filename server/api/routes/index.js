const { app } = require('../server');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');
const eventsRouter = require('./events');

const routes = [recipesRouter, ingredientsRouter, eventsRouter];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
