const axios = require('axios');
const { parseRecipes } = require('./utils');

const fetchRecipes = async (number, apiKey) => {
  const URL = 'https://api.spoonacular.com/recipes/random?';
  return axios
    .get(`${URL}number=${number}&apiKey=${apiKey}`)
    .then((response) => parseRecipes(response.data.recipes));
};

module.exports = {
  fetchRecipes,
};
