const { app } = require('../server');
const { recipeRouter } = require('./recipe');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');
const { cameraRouter } = require('./camera');
const eventsRouter = require('./events');

const routes = [
  eventsRouter,
  recipeRouter,
  recipesRouter,
  ingredientsRouter,
  cameraRouter,
];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
