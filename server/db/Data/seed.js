const { fetchRecipes } = require('./data');
const { Ingredient, Recipe } = require('../Models/index');
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_KEY;

const seedInitialData = async () => {
  await fetchRecipes(1, API_KEY).then((response) => {
    response.forEach(async (res) => {
      const { ingredients, recipe } = res;

      await Recipe.create(recipe);
      ingredients.forEach((ingredient) => {
        Ingredient.create(ingredient);
        ingredient.setRecipes(recipe);
      });
    });
  });
};

seedInitialData().then((response) => console.log(response));

module.exports = {
  seedInitialData,
};
