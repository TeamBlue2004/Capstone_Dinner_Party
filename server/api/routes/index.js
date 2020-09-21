const { app } = require('../server');
const { recipeRouter } = require('./recipe');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');
const { cameraRouter } = require('./camera');
const { userRouter } = require('./users');
const eventsRouter = require('./events');

const routes = [
  eventsRouter,
  recipeRouter,
  recipesRouter,
  ingredientsRouter,
  cameraRouter,
  userRouter,
];

const initRoutes = () => {
  return routes.forEach((route) => {
    app.use('/api/', route);
  });
};

module.exports = {
  initRoutes,
};
