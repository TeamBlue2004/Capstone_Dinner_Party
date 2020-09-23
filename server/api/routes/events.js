const eventsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');

const { Event, User } = require('../../db/Models/index');

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
<<<<<<< Updated upstream
=======
        hostid: hostId,
>>>>>>> Stashed changes
        eventName,
        datetime,
        location,
      });

<<<<<<< Updated upstream
      event.setUser(host);
=======
      event.addUser(host);
>>>>>>> Stashed changes

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

module.exports = eventsRouter;
