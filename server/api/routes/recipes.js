const recipesRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Recipe, Ingredient } = require('../../db/Models/index.js');

recipesRouter.get('/recipes', async (req, res) => {
  const { ingredients } = req.query;
  try {
    const recipes = await Recipe.findAll({
      include: {
        model: Ingredient,
        where: {
          name: {
            [Op.iLike]: `%${ingredients}%`,
          },
        },
      },
    });
    console.log(recipes);
    res.status(200).send(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  recipesRouter,
};
