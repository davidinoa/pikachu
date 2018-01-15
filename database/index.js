var mongoose = require('mongoose');
var getRecipesByKeyword = require('./api_helper').getRecipesByKeyword;
var getRecipeInfoByIds = require('./api_helper').getRecipeInfoByIds;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/budgetchef');
}

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var recipeSchema = mongoose.Schema({
  recipeId: { type: String, required: true, unique: true }, // id
  recipeName: { type: String, required: true }, // title
  servings: { type: Number, required: true }, // servings
  servingPrice: { type: Number, required: true }, // pricePerServing
  recipeUrl: { type: String, required: true }, // sourceUrl
  imageUrl: { type: String, required: true }, // image
  popularity: { type: Number }, // aggregateLikes
  healthScore: { type: Number }, // healthScore
  cuisines: { type: Array }, // cuisines
  dishTypes: { type: Array }, // dishTypes
  diets: { type: Array } // diets
});

var Recipe = mongoose.model('Recipe', recipeSchema);

// fix function to send data back
var saveRecipesToMongo = function(recipes, callback) {
  recipes.forEach(function(recipe) {
    new Recipe({
      recipeId: recipe.id,
      recipeName: recipe.title,
      servings: recipe.servings,
      servingPrice: (recipe.pricePerServing / 100).toFixed(2),
      recipeUrl: recipe.sourceUrl,
      imageUrl: recipe.image,
      popularity: recipe.aggregateLikes,
      healthScore: recipe.healthScore,
      cuisines: recipe.cuisines,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets
    }).save(function(err) {
      if (err) {
        return console.log('document already exists');
      }
      console.log('document saved');
      callback();
    });
  });
};

const getDataFromAPI = (keywords, callback) => {
  getRecipesByKeyword(keywords, (err, results) => {
    if (err) {
      return console.error(err);
    }
    getRecipeInfoByIds(results, (err, data) => {
      if (err) {
        return console.error(err);
      }
      callback(JSON.parse(data));
    });
  });
};

const getRecipesFromMongo = (budget, keyword, callback) => {
  Recipe.find({ recipeName: new RegExp(keyword, 'i') })
    .where('servingPrice')
    .lt(budget)
    .sort('popularity')
    .then((recipes) => {
      callback(recipes);
    })
    .catch((error) => console.error(error));
};

module.exports = {
  saveRecipesToMongo: saveRecipesToMongo,
  getRecipesFromMongo: getRecipesFromMongo,
  getDataFromAPI: getDataFromAPI
};
