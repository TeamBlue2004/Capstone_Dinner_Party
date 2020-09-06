const recipesRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Recipe, Ingredient } = require('../../db/Models/index.js');

recipesRouter.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [Ingredient],
    });
    res.send(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  recipesRouter,
};
