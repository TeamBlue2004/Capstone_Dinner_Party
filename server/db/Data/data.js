const axios = require('axios');
const { parseRecipes } = require('./utils');

const fetchRecipes = async (number, apiKey) => {
  const URL = 'https://api.spoonacular.com/recipes/random?';
  return axios
    .get(`${URL}number=${number}&apiKey=${apiKey}`)
    .then((response) => parseRecipes(response.data.recipes));
};

const test = async () => {
  return axios
    .get('https://acme-users-api-rev.herokuapp.com/api/users')
    .then((response) => response);
};

module.exports = {
  fetchRecipes,
  test,
};
