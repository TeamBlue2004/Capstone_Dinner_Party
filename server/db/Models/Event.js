const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, DATEONLY, TIME } = Sequelize;
const { db } = require('../db');

const Event = db.define(
  'Event',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    place: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    host: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    date: {
      type: DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startTime: {
      type: TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endTime: {
      type: TIME,
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
