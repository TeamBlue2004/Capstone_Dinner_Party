const { User } = require('./User');
const { Recipe } = require('./Recipe');
const { Allergen } = require('./Allergen');
const { FoodPreference } = require('./FoodPreference');
const { Ingredient } = require('./Ingredient');
const { Event } = require('./Event');
const { User_Recipe } = require('./User_Recipe');
const { Session } = require('./Session');
const { Event_User } = require('./Event_User');
const { Event_Recipe } = require('./Event_Recipe');
const { Event_Recipe_User } = require('./Event_Recipe_User');

User.belongsToMany(User, { as: 'Friends', through: 'friends' });
User.belongsToMany(User, {
  as: 'Requestees',
  through: 'friendRequests',
  foreignKey: 'requesterId',
  onDelete: 'CASCADE',
});
User.belongsToMany(User, {
  as: 'Requesters',
  through: 'friendRequests',
  foreignKey: 'requesteeId',
  onDelete: 'CASCADE',
});

// User and Session
User.hasMany(Session);
Session.belongsTo(User);

// Relations between User and Allergen
User.hasMany(Allergen);
Allergen.belongsTo(User);

// Relations between User and FoodPreference
User.hasMany(FoodPreference);
FoodPreference.belongsTo(User);

// Relations between Recipe and Allergen
Recipe.belongsToMany(Allergen, { through: 'Recipe_Allergen' });
Allergen.belongsToMany(Recipe, { through: 'Recipe_Allergen' });

// Relations between Recipe and FoodPreference
Recipe.belongsToMany(FoodPreference, { through: 'Recipe_FoodPreference' });
FoodPreference.belongsToMany(Recipe, { through: 'Recipe_FoodPreference' });

// Relations between Recipe and Ingredient
Recipe.belongsToMany(Ingredient, { through: 'Recipe_Ingredient' });
Ingredient.belongsToMany(Recipe, { through: 'Recipe_Ingredient' });

// Relations between Event and User
User.belongsToMany(Event, { through: 'Event_User' });
Event.belongsToMany(User, { through: 'Event_User' });

// Relations between Event and Recipe
Event.belongsToMany(Recipe, { through: Event_Recipe });
Recipe.belongsToMany(Event, { through: Event_Recipe });

Recipe.belongsToMany(User, { through: Event_Recipe_User, as: 'User_Recipes' });
User.belongsToMany(Recipe, { through: Event_Recipe_User, as: 'User_Recipes' });

// Relations between Recipe and User
User.belongsToMany(Recipe, { through: User_Recipe });
Recipe.belongsToMany(User, { through: User_Recipe });

module.exports = {
  User,
  Recipe,
  Allergen,
  FoodPreference,
  Ingredient,
  Event,
  Session,
  Event_User,
  Event_Recipe,
  Event_Recipe_User,
  User_Recipe,
};
