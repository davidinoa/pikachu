var mongoose = require('mongoose');

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
  recipeId: { type: String, required: true, unique: true}, // id
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

var saveToMongo = function(recipes, callback) {
  recipes.forEach(function(recipe) {
    new Recipe({
      recipeId: recipe.id,
      recipeName: recipe.title,
      servings: recipe.servings,
      servingPrice: recipe.pricePerServing,
      recipeUrl: recipe.sourceUrl,
      imageUrl: recipe.image,
      popularity: recipe.aggregateLikes,
      healthScore: recipe.healthScore,
      cuisines: recipe.cuisines,
      dishTypes: recipe.dishTypes,
      diets: recipe.diets
    })
      .save(function(err) {
        if (err) { return console.error(err); }
        console.log('document saved');
      });
  });
};

module.exports = {
  selectAll: selectAll,
  saveToMongo: saveToMongo,
};