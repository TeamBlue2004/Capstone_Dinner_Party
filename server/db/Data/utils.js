const parseRecipes = (recipes) => {
  return recipes.map((recipe) => {
    const ingredients = recipe.extendedIngredients.map((ingredient) => {
      return {
        name: ingredient.originalName,
      };
    });
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
