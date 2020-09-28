const faker = require('faker');
const bcrypt = require('bcrypt');

const { fetchRecipes } = require('./data');
const { Ingredient, Recipe, User } = require('../Models/index');
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_KEY;

const users = [
  {
    firstName: 'Judith',
    lastName: 'Blinder',
    email: 'me@judith.com',
    username: 'judith',
    password: 'password',
  },
  {
    firstName: 'Bima',
    lastName: 'Saridjo',
    email: 'me@bima.com',
    username: 'bima',
    password: 'password',
  },
  {
    firstName: 'Shruti',
    lastName: 'Pahadiya',
    email: 'me@shruti.com',
    username: 'shruti',
    password: 'password',
  },
  {
    firstName: 'Caroline',
    lastName: 'Flanagan',
    email: 'me@caroline.com',
    username: 'caroline',
    password: 'password',
  },
];

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

    for (let i = 0; i < 50; i++) {
      const firstName = faker.fake('{{name.firstName}}');
      const lastName = faker.fake('{{name.lastName}}');
      const email = `${lastName}${firstName}@gmailFake.com`;
      const username = firstName;
      const password = 'password';

      const user = {
        firstName,
        lastName,
        email,
        username,
        password,
      };

      users.push(user);
    }

    const createdUsers = await Promise.all(
      users.map((user) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
          user.password = hash;
          User.create(user);
        });
      })
    );
  });
};

seedData();
