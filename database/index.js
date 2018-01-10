var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/budgetchef');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var recipeSchema = mongoose.Schema({
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

var selectAll = function(callback) {
  Recipe.find({}, function(err, recipes) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, recipes);
    }
  });
};

module.exports.selectAll = selectAll;