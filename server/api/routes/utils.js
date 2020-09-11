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

module.exports = {
    parseIngredients,
};
