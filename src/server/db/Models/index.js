const { User } = require('./User');
const { Receipe } = require('./Receipe');
const { Allergen } = require('./Allergen');
const { FoodPreference } = require('./FoodPreference');


//User can have many friends
User.belongsToMany(User,{through:'Friends'}); 

// Relations between User and Allergen
User.hasMany(Allergen);
Allergen.belongsTo(User);

// Relations between User and FoodPreference
User.hasMany(FoodPreference);
FoodPreference.belongsTo(User);

// Relations between Receipe and Allergen
Receipe.belongsToMany(Allergen,{through:'Receipe_Allergen'});
//Receipe.hasMany(Allergen);
//Allergen.belongsTo(Receipe);

// Relations between Receipe and FoodPreference
Receipe.belongsToMany(FoodPreference,{through:'Receipe_FoodPreference'});
Receipe.hasMany(FoodPreference);
FoodPreference.belongsTo(Receipe);




module.exports = {
  User,
  Receipe,
  Allergen,
  FoodPreference,
 };
