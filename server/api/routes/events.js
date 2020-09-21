const eventsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');

const { Event, User } = require('../../db/Models/index');

// eventsRouter.get();

eventsRouter.post(
  '/events',
  [
    check('host', 'Host name is required').not().isEmpty(),
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

    const { host, datetime, location } = req.body;
    try {
      const event = await Event.create({
        host,
        datetime,
        location,
      });

      res.status(200).send(event);
    } catch (e) {
      console.error(chalk.red(e));
      res.status(500).send({ message: 'Server Error' });
    }
  }
);

// eventsRouter.put();

// eventsRouter.delete();

eventsRouter.get('/events/userevents/:userId', async (req, res) => {
  const userId = 'dd6488cd-b8e3-4f45-91ee-6a7449fef285';
  console.log('inside route axios  call for eager data loading ', req.userId);
  console.log('hardcoded userid is --- ', userId);
  // const { userId } = req.userId;
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
    });
    console.log('userEventList is --- ', userEventList);

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
