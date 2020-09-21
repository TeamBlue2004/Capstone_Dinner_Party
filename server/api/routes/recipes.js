const recipesRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Recipe, Ingredient, User } = require('../../db/Models/index.js');
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

recipesRouter.get('/recipes/favorite/:userId', async (req, res) => {
  const userId = 'dd6488cd-b8e3-4f45-91ee-6a7449fef285';
  console.log('inside route for favorite receipe eager loading ', req.userId);
  console.log('hardcoded userid is --- ', userId);
  // const { userId } = req.userId;
  try {
    const favRecipesList = await Recipe.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          through: {
            where: {
              // Here, `favorite` is a column present at the through table
              favorite: true,
            },
          },
        },
      ],
    });
    console.log('favRecipesList is --- ', favRecipesList);
    res.status(200).send(favRecipesList);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  recipesRouter,
};
