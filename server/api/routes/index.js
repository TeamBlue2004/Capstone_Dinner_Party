const { app } = require('../server');
const { recipeRouter } = require('./recipe');
const { recipesRouter } = require('./recipes');
const { ingredientsRouter } = require('./ingredients');
const eventsRouter = require('./events');
const { userRouter } = require('./users');

const routes = [
  eventsRouter,
  recipeRouter,
  recipesRouter,
  ingredientsRouter,
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
