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
    if (vegan === true) { where.vegan = vegan; }
    // if (vegetarian === true) where.vegetarian = vegetarian;
    // if (dairyFree === true) where.dairyFree = dairyFree;
    // if (glutenFree === true) where.glutenFree = glutenFree;
    // console.log(vegan, where);
    return where;
};


module.exports = {
    parseIngredients,
    filters,
};
