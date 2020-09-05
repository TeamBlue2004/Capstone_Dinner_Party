const { User } = require('./User');
const { Recipe } = require('./Recipe');
const { Allergen } = require('./Allergen');
const { FoodPreference } = require('./FoodPreference');
const { Ingredient } = require('./Ingredient');
const { Event } = require('./Event');

// User can have many friends
User.belongsToMany(User, { through: 'Friends' });

// Relations between User and Allergen
User.hasMany(Allergen);
Allergen.belongsTo(User);

// Relations between User and FoodPreference
User.hasMany(FoodPreference);
FoodPreference.belongsTo(User);

// Relations between Recipe and Allergen
Recipe.belongsToMany(Allergen, { through: 'Recipe_Allergen' });
// Recipe.hasMany(Allergen);
// Allergen.belongsTo(Recipe);

// Relations between Recipe and FoodPreference
Recipe.belongsToMany(FoodPreference, { through: 'Recipe_FoodPreference' });
// Recipe.hasMany(FoodPreference);
// FoodPreference.belongsTo(Recipe);

// Relations between Recipe and Ingredient
Recipe.belongsToMany(Ingredient, { through: 'Recipe_Ingredient' });
// Recipe.hasMany(Allergen);
// Allergen.belongsTo(Recipe);

// Relations between Event and User
User.belongsToMany(Event, { through: 'Event_User' });
// Recipe.hasMany(Allergen);
// Allergen.belongsTo(Recipe);

module.exports = {
  User,
  Recipe,
  Allergen,
  FoodPreference,
  Ingredient,
  Event,
};
