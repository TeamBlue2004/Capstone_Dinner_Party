const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User } = require('../../db/Models/User');

userRouter.use(cors());
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

process.env.SECRET_KEY = 'secret';

userRouter.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send({
    users,
  });
});

userRouter.post('/users/register', (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    addressUnit: req.body.addressUnit,
    addressCity: req.body.addressCity,
    addressState: req.body.addressState,
    addressStreet: req.body.addressStreet,
    addressZIP: req.body.addressZIP,
    username: req.body.username,
    password: req.body.password,
    profilePic: req.body.profilePic,
  };
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((userres) => {
              res.json({ status: `${userres.username} Registered!` });
            })
            .catch((usererr) => {
              res.send(`error:  ${usererr}`);
            });
        });
      } else {
        res.json({ error: 'User already exists' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

userRouter.post('/users/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        }
      } else {
        res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

userRouter.get('/users/profile', (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

module.exports = {
  userRouter,
};
