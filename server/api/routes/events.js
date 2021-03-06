const eventsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');

const {
  Event,
  User,
  Recipe,
  Event_Recipe,
  Event_Recipe_User,
} = require('../../db/Models/index');

eventsRouter.get('/events/userevents/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userEventList = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          through: { where: { status: 'Approved' } },
        },
      ],
      order: [['datetime', 'ASC']],
    });
    res.status(200).send(userEventList);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ message: 'Server error while fetching event list for a user' });
  }
});

eventsRouter.get('/events/userevents/pending/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userPendingEventList = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          through: { where: { status: 'Pending' } },
        },
      ],
      order: [['datetime', 'ASC']],
    });
    res.status(200).send(userPendingEventList);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching pending event list for a user',
    });
  }
});

eventsRouter.get('/events/eventGuests/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const eventGuestsList = await Event.findOne({
      where: {
        id: eventId,
      },
      include: [
        {
          model: User,
          through: { where: { status: 'Approved' } },
        },
      ],
    });
    res.status(200).send(eventGuestsList);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ message: 'Server error while fetching guest list for an event' });
  }
});

eventsRouter.post(
  '/events',
  [
    check('hostId', 'hostId is required').not().isEmpty(),
    check('eventName', 'Event name is required').not().isEmpty(),
    check('datetime', 'Date and time is required').isISO8601().toDate(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { hostId, eventName, datetime, location, invitees } = req.body;
    const host = await User.findOne({
      where: {
        id: hostId,
      },
    });
    const hostName = `${host.firstName} ${host.lastName}`;

    try {
      const event = await Event.create({
        host: hostName,
        hostid: hostId,
        eventName,
        datetime,
        location,
      });

      event.addUser(host, { through: { status: 'Approved' } });
      invitees.forEach((invitee) => {
        User.findOne({ where: { id: invitee.value } }).then((user) =>
          event.addUser(user, { through: { status: 'Pending' } })
        );
      });

      res.status(200).send(event);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error while adding event' });
    }
  }
);

eventsRouter.put(
  '/events/accept',
  [
    check('userId', 'userId is required').not().isEmpty(),
    check('eventId', 'eventId is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { userId, eventId } = req.body;
    try {
      const event = await Event.findOne({
        where: {
          id: eventId,
        },
      });
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      event.addUser(user, { through: { status: 'Approved' } });
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error while updating event' });
    }
  }
);

eventsRouter.put(
  '/events/decline',
  [
    check('userId', 'userId is required').not().isEmpty(),
    check('eventId', 'eventId is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { userId, eventId } = req.body;
    try {
      const event = await Event.findOne({
        where: {
          id: eventId,
        },
      });
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      event.addUser(user, { through: { status: 'Declined' } });
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'Server error while updating event' });
    }
  }
);

eventsRouter.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const eventToDelete = await Event.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Recipe,
          include: [
            {
              model: User,
              as: 'User_Recipes',
            },
          ],
        },
      ],
    });
    // await eventToDelete.Recipes.forEach(async (recipe) => {
    //   const { RecipeId } = recipe.User_Recipes[0].Event_Recipe_User;
    //   const { UserId } = recipe.User_Recipes[0].Event_Recipe_User;
    //   await Event_Recipe_User.destroy({
    //     where: {
    //       RecipeId,
    //       UserId,
    //     },
    //   });
    // });
    await eventToDelete.destroy();

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error while deleting event' });
  }
});

eventsRouter.get(
  '/events/recipes/:eventId',
  [check('eventId', 'Event ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { eventId } = req.params;
    try {
      const event = await Event.findOne({
        where: {
          id: eventId,
        },
        include: [
          {
            model: Recipe,
            include: [
              {
                model: User,
                as: 'User_Recipes',
              },
            ],
          },
        ],
      });
      res.status(200).send(event.Recipes);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

eventsRouter.post(
  '/events/recipes',
  [
    check('eventId', 'Event ID is required').not().isEmpty(),
    check('recipeId', 'Recipe ID is required').not().isEmpty(),
    check('userId', 'User ID is required').not().isEmpty(),
    check('dish', 'Dish type is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { eventId, recipeId, userId, dish } = req.body;
    try {
      await Event_Recipe.create({
        EventId: eventId,
        RecipeId: recipeId,
        dish,
      });
      await Event_Recipe_User.create({
        RecipeId: recipeId,
        UserId: userId,
      });
      const event = await Event.findOne({
        where: {
          id: eventId,
        },
        include: [
          {
            model: Recipe,
            include: [
              {
                model: User,
                as: 'User_Recipes',
              },
            ],
          },
        ],
      });
      res.status(200).send(event);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

eventsRouter.put(
  '/events/recipes',
  [
    check('eventRecipeId', 'Event Recipe ID is required').not().isEmpty(),
    check('dish', 'Dish type is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { eventRecipeId, dish } = req.body;
    const eventRecipe = await Event_Recipe.findByPk(eventRecipeId);
    try {
      if (eventRecipe) {
        await eventRecipe.update({
          dish,
        });
      }
      const event = await Event.findOne({
        where: {
          id: eventRecipe.EventId,
        },
        include: [
          {
            model: Recipe,
            where: {
              id: eventRecipe.RecipeId,
            },
            include: [
              {
                model: User,
                as: 'User_Recipes',
              },
            ],
          },
        ],
      });
      res.status(200).send(event.Recipes[0]);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

eventsRouter.delete(
  '/events/recipes/:eventRecipeId/:eventRecipeUserId',
  [
    check('eventRecipeId', 'Event Recipe ID is required').not().isEmpty(),
    check('eventRecipeUserId', 'Event Recipe User ID is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { eventRecipeId, eventRecipeUserId } = req.params;
    try {
      const eventRecipe = await Event_Recipe.findByPk(eventRecipeId);
      const eventRecipeUser = await Event_Recipe_User.findByPk(
        eventRecipeUserId
      );
      await eventRecipe.destroy();
      await eventRecipeUser.destroy();

      res.status(200).send(eventRecipe.RecipeId);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

eventsRouter.get('/events/commonevents/:friendId/:userId', async (req, res) => {
  const { friendId, userId } = req.params;
  try {
    const myEventList = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          through: { where: { status: 'Approved' } },
        },
      ],
      raw: true,
    });

    const friendsEventList = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: friendId,
          },
          through: { where: { status: 'Approved' } },
        },
      ],
    });

    const commonEvents = [];
    myEventList.forEach((myEvent) => {
      friendsEventList.forEach((friendEvent) => {
        if (friendEvent.id === myEvent.id) {
          commonEvents.push(friendEvent);
        }
      });
    });
    res.status(200).send(commonEvents);
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: 'Server error while fetching common events of user & friend',
    });
  }
});
module.exports = eventsRouter;
