const ingredientsRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Recipe, Ingredient } = require('../../db/Models/index.js');

ingredientsRouter.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      include: [Recipe],
    });
    res.status(200).send(ingredients);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  ingredientsRouter,
};
