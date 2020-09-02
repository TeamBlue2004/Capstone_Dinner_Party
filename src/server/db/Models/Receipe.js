const Sequelize = require('sequelize');

const {
  UUID, UUIDV4, STRING, BOOLEAN,
} = Sequelize;
const { db } = require('../db');

const Receipe = db.define('Receipe', {
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
  ingredients: {
    type: TEXT,
    allowNull: false,
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


module.exports = { Receipe };