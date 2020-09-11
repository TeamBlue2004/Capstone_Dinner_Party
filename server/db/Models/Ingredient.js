const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING } = Sequelize;
const { db } = require('../db');

const Ingredient = db.define(
  'Ingredient',
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
  },
  {
    tableName: 'Ingredient',
  }
);

module.exports = { Ingredient };
