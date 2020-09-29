const eventsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');

const { Event, User, Event_Recipe } = require('../../db/Models/index');

// eventsRouter.get();

eventsRouter.post(
  '/events',
  [
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
    const { hostId, eventName, datetime, location } = req.body;
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

      event.addUser(host);

      res.status(200).send(event);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

// eventsRouter.put();

eventsRouter.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error while deleting event' });
  }
});

eventsRouter.get('/events/userevents/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // find out events associated with a user from through table
    const userEventList = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
        },
      ],
      order: [['datetime', 'ASC']],
    });
    // eventsArr.push(event);
    res.status(200).send(userEventList);
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send({ message: 'Server error while fetching event list for a user' });
  }
});

eventsRouter.post(
  '/events/recipes',
  [
    check('eventId', 'Event ID is required').not().isEmpty(),
    check('recipeId', 'Recipe ID is required').not().isEmpty(),
    check('userId', 'User ID is required').not().isEmpty(),
    check('dishType', 'Dish type is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }
    const { eventId, recipeId, userId, dishType } = req.body;
    try {
      const create = await Event_Recipe.create({
        userId,
        EventId: eventId,
        RecipeId: recipeId,
        dish: dishType,
      });
      res.status(200).send(create);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

module.exports = eventsRouter;
