const cameraRouter = require('express').Router();
const { fetchIngredientsFromImage } = require('./utils');
// const { check, validationResult } = require('express-validator');

cameraRouter.post('/camera', async (req, res) => {
  const { imgBase } = req.body;
  try {
    fetchIngredientsFromImage(imgBase).then((response) =>
      res.status(200).send(response)
    );
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  cameraRouter,
};
