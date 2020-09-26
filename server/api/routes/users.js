const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Session } = require('../../db/Models/index');

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
    } else {
      res.status(400).send({ message: `Password is incorrect` });
    }
  } else {
    res
      .status(400)
      .send({ message: `User ${req.body.username} does not exist` });
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

userRouter.get('/users/searchusers/:searchTerm', async (req, res) => {
  const searchValue = req.params.searchTerm;
  const usersList = await User.findAll({
    where: {
      [Op.or]: [
        { username: { [Op.like]: `%${searchValue}%` } },
        { firstName: { [Op.like]: `%${searchValue}%` } },
        { lastName: { [Op.like]: `%${searchValue}%` } },
      ],
    },
  });
  res.status(200).send(usersList);
});

// Adding one row in friendRequests Table - userId is loggedin and friendId is to whom request is sent
userRouter.post('/users/addasfriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  user.addRequestees(friendId).then((result) => {
    res.status(201).send({ message: 'Friend request sent!' });
  });
});

// Pending friends from below method
userRouter.get('/users/pendinguserfriends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const pendingFriendsList = await User.findAll({
      include: [
        {
          model: User,
          as: 'Requestees',
          // through: 'friendRequests',
          required: true,
          where: {
            id: userId,
          },
        },
      ],
    });
    res.status(200).send(pendingFriendsList);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching Users pendingFriendsList',
    });
  }
});

// Adding one row in friends Table - userId is loggedin and friendId is the user whose request is getting approved
userRouter.post('/users/approveasfriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  const friend = await User.findByPk(friendId);
  user.addFriend(friendId).then((result) => {
    res.status(201).send({ message: 'Friend request accepted!' });
  });
  user.removeRequesters(friend);
});

// Below method will give approved friends
userRouter.get('/users/approveduserfriends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const approvedFriendsList = await User.findAll({
      include: [
        {
          model: User,
          as: 'Friends',
          // through: 'friendRequests',
          required: true,
          where: {
            id: userId,
          },
        },
      ],
    });
    res.status(200).send(approvedFriendsList);
    } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching Users approvedFriendsList',
    });
  }
});

module.exports = {
  userRouter,
};
