const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, BOOLEAN, TEXT } = Sequelize;
const { db } = require('../db');

const Recipe = db.define(
  'Recipe',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    vegan: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    vegetarian: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    glutenFree: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dairyFree: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    steps: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    favoriteCount: {
      type: INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Recipe',
  }
);

Recipe.prototype.addToUserFavorite = async function addToUserFavorite(
  user,
  recipeId
) {
  user.addRecipe(recipeId);
  this.increment('favoriteCount', { by: 1 });
};

Recipe.prototype.removeFromUserFavorite = async function removeFromUserFavorite(
  user,
  recipeId
) {
  user.removeRecipe(recipeId);
  this.decrement('favoriteCount', { by: 1 });
};

module.exports = { Recipe };
