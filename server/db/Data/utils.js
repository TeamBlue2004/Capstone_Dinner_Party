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
        image: recipe.image,
        vegan: recipe.vegan,
        vegetarian: recipe.vegetarian,
        dairyFree: recipe.dairyFree,
        glutenFree: recipe.glutenFree,
        steps: recipe.instructions,
      },
      ingredients,
    };
  });
};

module.exports = {
  parseRecipes,
};
