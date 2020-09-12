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

const filters = (vegan, vegetarian, dairyFree, glutenFree) => {
    const where = {};
    if (vegan) where.vegan = vegan;
    if (vegetarian) where.vegetarian = vegetarian;
    if (dairyFree) where.dairyFree = dairyFree;
    if (glutenFree) where.glutenFree = glutenFree;
    return where;
};

module.exports = {
    parseIngredients,
    filters,
};
