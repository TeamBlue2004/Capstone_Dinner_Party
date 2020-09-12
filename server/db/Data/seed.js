const { fetchRecipes } = require('./data');
const { Ingredient, Recipe } = require('../Models/index');
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_KEY;

const seedData = async () => {
  await fetchRecipes(50, API_KEY).then(async (response) => {
    response.forEach(async (res) => {
      const { ingredients, recipe } = res;
      const createdRecipe = await Recipe.create(recipe);
      if (ingredients.name !== '') {
        const createdIngredient = await Ingredient.create(ingredients);
        await createdIngredient.setRecipes(createdRecipe);
      }
    });
  });
};

seedData();
