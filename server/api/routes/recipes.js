const recipesRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Recipe, Ingredient } = require('../../db/Models/index.js');
const { parseIngredients, filters } = require('./utils');

recipesRouter.get('/recipes', async (req, res) => {
  const { ingredients, vegan, vegetarian, dairyFree, glutenFree } = req.query;
  try {
    const recipes = await Recipe.findAll({
      where: filters({ vegan }, { vegetarian }, { dairyFree }, { glutenFree }),
      include: {
        model: Ingredient,
        where: {
          [Op.and]: parseIngredients(ingredients),
        },
      },
    });
    res.status(200).send(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  recipesRouter,
};
