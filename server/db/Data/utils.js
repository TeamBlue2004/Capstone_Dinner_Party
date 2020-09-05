const parseRecipes = (recipes) => {
  return recipes.map((recipe) => {
    const ingredients = recipe.extendedIngredients.reduce((a, b) => {
      return `${a + b.originalString};`;
    }, '');
    return {
      recipe: {
        name: recipe.title,
        vegan: recipe.vegan,
        vegetarian: recipe.vegetarian,
        steps: recipe.instructions,
      },
      ingredients,
    };
  });
};

module.exports = {
  parseRecipes,
};
