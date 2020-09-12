const parseRecipes = (recipes) => {
  return recipes.map((recipe) => {
    const ingredients = recipe.extendedIngredients.reduce((a, b) => {
      return `${a + b.originalName};`;
    }, '');
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
      ingredients: {
        name: ingredients,
      },
    };
  });
};

module.exports = {
  parseRecipes,
};
