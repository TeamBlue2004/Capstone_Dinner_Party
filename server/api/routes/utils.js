const { Op } = require('sequelize');

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

module.exports = {
  parseIngredients,
  filters,
};
