const axios = require('axios');

const fetchRecipes = async (number, apiKey) => {
  const URL = 'https://api.spoonacular.com/recipes/random?';
  return axios
    .get(`${URL}number=${number}&apiKey=${apiKey}`)
    .then((response) => response);
};

module.exports = fetchRecipes;
