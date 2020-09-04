const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, BOOLEAN, TEXT } = Sequelize;
const { db } = require('../db');

const Recipe = db.define('Recipe', {
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
  steps: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Recipe };
