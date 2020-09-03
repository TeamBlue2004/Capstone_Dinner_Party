const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const {
  UUID, UUIDV4, STRING, BOOLEAN,
} = Sequelize;
const { db } = require('../db');

const User = db.define('User', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
  type: STRING,
  allowNull: false,
},
lastName: {
  type: STRING,
  allowNull: false,
},
email: {
  type: STRING,
  allowNull: false,
  validate: {
    isEmail: true,
  },
},

  addressUnit: {
    type: STRING,
    allowNull: true,
  },
  addressStreet: {
    type: STRING,
    allowNull: true,
  },
  addressCity: {
    type: STRING,
    allowNull: true,
  },
  addressState: {
    type: STRING,
    allowNull: true,
  },
  addressZIP: {
    type: INTEGER,
    allowNull: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
 
});

User.beforeCreate((user) => bcrypt.hash(user.password, 10)
  .then((hash) => {
    // eslint-disable-next-line no-param-reassign
    user.password = hash;
  })
  .catch((e) => {
    throw e;
  }));

module.exports = { User };