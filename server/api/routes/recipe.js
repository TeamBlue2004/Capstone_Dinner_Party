const recipeRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Recipe, Ingredient } = require('../../db/Models/index.js');

recipeRouter.get('/recipe/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Ingredient,
      },
    });
    res.status(200).send(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  recipeRouter,
};
