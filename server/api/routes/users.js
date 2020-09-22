const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User } = require('../../db/Models/User');
const { Session } = require('../../db/Models/Session');

userRouter.use(cors());
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));

process.env.SECRET_KEY = 'secret';

userRouter.get('/users/session', async (req, res) => {
  try {
    const session = await Session.findByPk(req.session_id);
    if (session.UserId) {
      const user = await User.findByPk(session.UserId);
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

userRouter.put('/users/logout', async (req, res) => {
  const session = await Session.findByPk(req.session_id);
  try {
    await session.update({ UserId: null });
    res.status(201).send({ message: `user loggedout` });
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
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

userRouter.post('/users/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const usersSession = await Session.findByPk(req.session_id);
      await usersSession.setUser(user);
      res.status(200).send(user);
    }
  } else {
    res.status(400).json({ error: 'User does not exist' });
  }
});

userRouter.get('/users/userfriends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // find out friends associated with a user from through table
    // const userFriendsList = await User.findAll({
    // //  where: { id: userId },
    //   include: [{ model: User, as: 'userFriends' }],
    // //  raw: false,
    // });

    const userRecord = await User.findOne({
      where: { id: userId },
    });

    const userFriendsList = await userRecord.getFriends();

    console.log('userFriendsList is --- ', userFriendsList);
    res.status(200).send(userFriendsList);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ message: 'Server error while fetching Users friendsList' });
  }
});

userRouter.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId } });
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching details for loggedin user',
    });
  }
});

userRouter.put('/users/updateuser/:userid', async (req, res) => {
  await User.findByPk(req.params.userid).then((user) => {
    user.update(
      {
        username: req.body.user.username,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        addressUnit: req.body.user.addressUnit,
        addressStreet: req.body.user.addressStreet,
        addressCity: req.body.user.addressCity,
        addressState: req.body.user.addressState,
        addressZIP: req.body.user.addressZip,
      },
      { returning: true, plain: true }
    );
  });
  res.sendStatus(200);
});

module.exports = {
  userRouter,
};
