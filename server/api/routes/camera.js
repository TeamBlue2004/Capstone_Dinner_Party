const cameraRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const Clarifai = require('clarifai');
require('dotenv').config();

const API_KEY = process.env.CLARIFAI_KEY;

cameraRouter.post('/camera', async (req, res) => {
  // const { imgBase } = req.body;
  const { result } = req.body;
  try {
    const app = new Clarifai.App({
      apiKey: API_KEY,
    });

    const detect = async (image) => {
      const response = await app.models.predict(Clarifai.FOOD_MODEL, image);
      return response;
    };

    detect(result).then((response) => {
      const ingredients = response.outputs[0].data.concepts
        .filter(
          (prediction) =>
            prediction.value > 0.9 &&
            prediction.name !== 'vegetable' &&
            prediction.name !== 'pasture' &&
            prediction.name !== 'aliment'
        )
        .map((ingredient) => ingredient.name);
      res.status(200).send(ingredients);
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  cameraRouter,
};
