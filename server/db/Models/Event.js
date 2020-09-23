const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, DATE } = Sequelize;
const { db } = require('../db');

const Event = db.define(
  'Event',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    host: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    eventName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    datetime: {
      type: DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'Event',
  }
);

module.exports = { Event };
