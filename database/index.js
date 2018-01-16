var mongoose = require('mongoose');
var getRecipesByKeyword = require('./api_helper').getRecipesByKeyword;
var getRecipeInfoByIds = require('./api_helper').getRecipeInfoByIds;


// When you install mLab as an add-on in Heroku, MONGODB_URI is automatically added as a Heroku's config var.
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/budgetchef');
}

var db = mongoose.connection;
db.on('error', function() { console.log('mongoose connection error'); });
db.once('open', function() { console.log('mongoose connected successfully'); });

var recipeSchema = mongoose.Schema({
  recipeId: { type: String, required: true, unique: true },
  recipeName: { type: String, required: true },
  servings: { type: Number, required: true },
  servingPrice: { type: Number, required: true },
  recipeUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  popularity: { type: Number },
  healthScore: { type: Number },
  cuisines: { type: Array },
  dishTypes: { type: Array },
  diets: { type: Array }
});

var Recipe = mongoose.model('Recipe', recipeSchema);

// Function to save recipes to Mongo
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
      if (err) { return console.log('document already exists'); }
      callback();
    });
  });
};

// This is the function that interacts with the API
// DO NOT USE THIS UNTIL YOU HAVE SET LIMIT REQUESTS IN YOUR HEADERS!!! TRUST ME, ITS REALLY EASY TO GO OVER YOUR QUOTA LIMIT.
const getDataFromAPI = (keywords, callback) => {
  // First step is to retrieve recipes by keywords
  getRecipesByKeyword(keywords, (err, results) => {
    if (err) { return console.error(err); }
    // Second step is to grab the recipes ids from the request made at the first endpoint and get more detailed information about each recipe by pinging the API at a different enpoint
    getRecipeInfoByIds(results, (err, data) => {
      if (err) { return console.error(err); }
      // If the previous two functions are succesful, you could manipulate the recipe results by passsing in a callback
      callback(JSON.parse(data));
    });
  });
};

// Function to retrieve recipes from Mongo given a budget and a keyword(optional)
const getRecipesFromMongo = (budget, keyword, callback) => {
  Recipe.find({ recipeName: new RegExp(keyword, 'i') })
    .where('servingPrice').lt(budget)
    .sort('popularity')
    .then(recipes => callback(recipes))
    .catch(error => console.error(error));
};

module.exports = {
  saveRecipesToMongo: saveRecipesToMongo,
  getRecipesFromMongo: getRecipesFromMongo,
  getDataFromAPI: getDataFromAPI
};
