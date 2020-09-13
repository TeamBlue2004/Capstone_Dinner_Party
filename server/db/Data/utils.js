const parseRecipes = (recipes) => {
  return recipes.map((recipe) => {
    const ingredients = recipe.extendedIngredients.map((ingredient) => {
      return ingredient.originalString;
    });
    const steps = recipe.analyzedInstructions[0].steps
      .map((instruction) => instruction.step)
      .join(';');
    return {
      recipe: {
        name: recipe.title,
        image: recipe.image,
        vegan: recipe.vegan,
        vegetarian: recipe.vegetarian,
        glutenFree: recipe.glutenFree,
        dairyFree: recipe.dairyFree,
        steps,
      },
      ingredients: {
        name: ingredients.join(';'),
      },
    };
  });
};

module.exports = {
  parseRecipes,
};
