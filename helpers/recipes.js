var database = require('../database/index.js');

exports.getRecipes = (req, res) => {
  database.Recipe.find()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.newRecipe = (req, res) => {
  console.log(req.body);
  database.Recipe.create(req.body)
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getRecipe = (req, res) => {
  database.Recipe.findById(req.body._id)
    .then((foundRecipe) => {
      res.json(foundRecipe);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updateRecipe = (req, res) => {
  database.Recipe.findOneAndUpdate({_id: req.body._id}, req.body)
    .then((recipe) => {
      res.json(Recipe);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.deleteRecipe = (req, res) => {
  console.log('deleteRecipe req body', req.body);
  database.Recipe.remove(req.body)
    .then(() => {
      res.json({message: 'recipe deleted'});
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = exports;
