const Sequelize = require('sequelize');

const {
  UUID, UUIDV4, STRING, BOOLEAN,
} = Sequelize;
const { db } = require('../db');

const FoodPreference = db.define('FoodPreference', {
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
});

module.exports = { FoodPreference };

