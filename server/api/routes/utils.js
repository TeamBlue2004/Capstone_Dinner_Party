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
        for (let key in arg) {
            if (arg[key]) where[key] = arg[key]
        }
    });
    return where;
};

module.exports = {
    parseIngredients,
    filters,
};
