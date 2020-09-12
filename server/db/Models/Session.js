const { UUID, UUIDV4 } = require('sequelize');
const { db } = require('../db');

const Session = db.define(
  'Session',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
  },
  {
    tableName: 'Session',
  }
);

module.exports = { Session };
