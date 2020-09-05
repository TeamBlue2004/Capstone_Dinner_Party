const { fetchRecipes } = require('./data');
const { Ingredient, Recipe } = require('../Models/index');
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_KEY;

const initialData = async () => {
  await fetchRecipes(10, API_KEY).then(async (response) => {
    response.forEach(async (res) => {
      const { ingredients, recipe } = res;
      await Recipe.create(recipe);
      await ingredients.forEach(async (ingredient) => {
        if (ingredient.name !== '') {
          await Ingredient.create(ingredient);
        }
        // await ingredient.setRecipes(recipe);
      });
    });
  });
};

initialData();
