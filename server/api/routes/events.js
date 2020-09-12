const eventsRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');

const { Event } = require('../../db/Models/index');

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

module.exports = eventsRouter;
