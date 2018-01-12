const express = require('express');
const router = express.Router();
const database = require('../../database/index.js');
const helpers = require('../../helpers/recipes');

// router.get('/', (req, res, next) => {

// });


// router.post('/recipes', (req, res, next) => {
//   let keywords = req.body.keywords;
//   let budget = req.body.budget;

//   database.getRecipesFromMongo(budget, keywords, (data) => {
//     // if (data.length === 0 && APIChecked) {
//     //   // database.getRecipesFromMongo();
//     // }
//     res.status(201).json(data);
//   });
// });

router.route('/recipes')
  .get(helpers.getRecipes)
  .post(helpers.newRecipe);

router.route('/:recipeId')
  .get(helpers.getRecipe)
  .put(helpers.updateRecipe)
  .delete(helpers.deleteRecipe);

module.exports = router;
