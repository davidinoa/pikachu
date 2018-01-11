const express = require('express');
const router = express.Router();
const database = require('../../database/index.js');

// router.get('/', (req, res, next) => {

// });


router.post('/recipes', (req, res, next) => {
  let keywords = req.body.keywords;
  let budget = req.body.budget;

  database.getRecipesFromMongo(budget, keywords, (data) => {
    // if (data.length === 0 && APIChecked) {
    //   // database.getRecipesFromMongo();
    // }
    res.status(201).json(data);
  });
});




module.exports = router;