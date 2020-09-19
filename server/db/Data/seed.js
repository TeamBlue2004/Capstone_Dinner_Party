const { fetchRecipes } = require('./data');
const { Ingredient, Recipe, User } = require('../Models/index');
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_KEY;

const seedData = async () => {
  await fetchRecipes(10, API_KEY).then(async (response) => {
    response.forEach(async (res) => {
      const { ingredients, recipe } = res;
      const createdRecipe = await Recipe.create(recipe);
      if (ingredients.name !== '') {
        const createdIngredient = await Ingredient.create(ingredients);
        await createdIngredient.setRecipes(createdRecipe);
      }
    });
  });
  await User.create({
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    addressUnit: 'test',
    addressCity: 'test',
    addressState: 'test',
    addressStreet: 'test',
    addressZIP: 123454,
    username: 'test',
    password: 'password',
    profilePic: 'test',
  });
};

seedData();
