const cameraRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
// const { Recipe, Ingredient } = require('../../db/Models/index.js');
const Clarifai = require('clarifai');

cameraRouter.get('/camera', async (req, res) => {
  console.log('test');
  try {
    const app = new Clarifai.App({
      apiKey: '8aba8745bf1a43daac040563dba52dee',
    });

    const detect = async (image) => {
      const response = await app.models.predict(Clarifai.FOOD_MODEL, image);
      return response;
    };

    detect(
      'https://nhncwtttsf-flywheel.netdna-ssl.com/6/wp-content/uploads/sites/29/2019/01/Eat-Vegetables.jpg'
    ).then((response) => console.log(response));
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  cameraRouter,
};
