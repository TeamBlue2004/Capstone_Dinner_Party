const { Op } = require('sequelize');
const Clarifai = require('clarifai');
require('dotenv').config();

const parseIngredients = (ingredients) => {
  return ingredients.split(',').map((ingredient) => {
    return {
      name: {
        [Op.iLike]: `%${ingredient}%`,
      },
    };
  });
};

const filters = (...args) => {
  const where = {};
  args.forEach((arg) => {
    const [key, value] = Object.entries(arg).flat();
    if (value) where[key] = value;
  });
  return where;
};

const fetchIngredientsFromImage = async (image) => {
  const API_KEY = process.env.CLARIFAI_KEY;

  const app = new Clarifai.App({
    apiKey: API_KEY,
  });
  const detect = async () => {
    const response = await app.models.predict(Clarifai.FOOD_MODEL, image);
    return response;
  };

  return detect(image).then((response) => {
    const ingredients = response.outputs[0].data.concepts
      .filter(
        (prediction) =>
          prediction.value > 0.9 &&
          prediction.name !== 'vegetable' &&
          prediction.name !== 'pasture' &&
          prediction.name !== 'aliment'
      )
      .map((ingredient) => ingredient.name);
    return ingredients;
  });
};

module.exports = {
  parseIngredients,
  filters,
  fetchIngredientsFromImage,
};
