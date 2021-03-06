const userRouter = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(__req, _file, cb) {
    cb(null, './uploads/');
  },
  filename(__req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const { User, Session, Recipe, User_Recipe } = require('../../db/Models/index');

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

userRouter.put('/users/logout', async (req, res) => {
  const session = await Session.findByPk(req.session_id);
  try {
    await session.update({ UserId: null });
    res.status(201).send({ message: `user loggedout` });
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
});

userRouter.get('/users/userfriends/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userRecord = await User.findOne({
      where: { id: userId },
    });

    const userFriendsList = await userRecord.getFriends();

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

userRouter.post('users/uploads/', upload.single('profilePic'), (req, res) => {
  return res.sendStatus(200);
});

userRouter.put(
  '/users/updateuser/:userid',
  // upload.single('profilePic'),
  async (req, res) => {
    const updParams = {};
    const {
      user: {
        username,
        firstName,
        lastName,
        email,
        addressUnit,
        addressStreet,
        addressCity,
        addressState,
        addressZIP,
        profilePic,
        favoriteFoods,
        dislikedFoods,
      },
    } = req.body;
    if (username) updParams.username = username;
    if (firstName) updParams.firstName = firstName;
    if (lastName) updParams.lastName = lastName;
    if (email) updParams.email = email;
    if (addressUnit) updParams.addressUnit = addressUnit;
    if (addressStreet) updParams.addressStreet = addressStreet;
    if (addressCity) updParams.addressCity = addressCity;
    if (addressState) updParams.addressState = addressState;
    if (addressZIP) updParams.addressZIP = addressZIP;
    if (profilePic) updParams.profilePic = profilePic;
    if (favoriteFoods) updParams.favoriteFoods = favoriteFoods;
    if (dislikedFoods) updParams.dislikedFoods = dislikedFoods;
    const updatedUser = await User.findByPk(req.params.userid);
    await updatedUser.update(updParams);
    res.status(200).send(updatedUser);
  }
);

userRouter.get('/users', async (req, res) => {
  const usersList = await User.findAll();
  res.status(200).send(usersList);
});

// Adding one row in friendRequests Table - userId is loggedin and friendId is to whom request is sent
userRouter.post('/users/addasfriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  user.addRequestees(friendId).then(() => {
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
userRouter.post('/users/approveFriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  const friend = await User.findByPk(friendId);
  friend.addFriend(userId);
  user.addFriend(friendId).then(() => {
    res.status(201).send({ message: 'Friend request accepted!' });
  });
  user.removeRequesters(friend);
});

userRouter.post('/users/declineFriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  const friend = await User.findByPk(friendId);

  user.removeRequesters(friend).then(() => {
    res.status(201).send({ message: 'Friend request declined!' });
  });
});

userRouter.post('/users/deleteFriend', async (req, res) => {
  const { friendId, userId } = req.body;
  const user = await User.findByPk(userId);
  const friend = await User.findByPk(friendId);
  friend.removeFriend(userId);
  user.removeFriend(friendId).then(() => {
    res.status(201).send({ message: 'Friend removed!' });
  });
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

userRouter.get('/users/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [Recipe],
    });
    if (user) {
      res.status(200).send(user.Recipes);
    } else {
      res.status(404).send({ message: 'not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

userRouter.post('/users/favorites', async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: [Recipe],
    });
    const recipe = await Recipe.findByPk(recipeId);
    if (user) {
      if (user.Recipes.some((rcp) => rcp.id === recipeId)) {
        recipe.removeFromUserFavorite(User_Recipe, userId, recipeId);
      } else {
        recipe.addToUserFavorite(User_Recipe, userId, recipeId);
      }
      res.status(200).send({ user });
    } else {
      res.status(404).send({ message: 'not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

userRouter.get('/users/friends/:friendId', async (req, res) => {
  const { friendId } = req.params;
  try {
    const friend = await User.findOne({ where: { id: friendId } });
    res.status(200).send(friend);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching details for friend',
    });
  }
});

module.exports = {
  userRouter,
};
