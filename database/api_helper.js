const request = require('request');
let config;
let PROJECT_KEY;
let PROJECT_HOST;

if (process.env.NODE_ENV === 'production') {
  PROJECT_KEY = process.env.PROJECT_KEY;
  PROJECT_HOST = process.env.PROJECT_HOST;
} else {
  config = require('../config.js');
  PROJECT_KEY = config.PROJECT_KEY;
  PROJECT_HOST = config.PROJECT_HOST;
}


// This function makes the request to API for up to 12 results matching provided keyword(s)
// NOTE: You're allowed to make up to 50 API requests or 500 results per day, whichever comes first.
// Rapid and Spoonacular will not notify you if you go over limit, so be extra careful.
// (Store your API key in config.js and heroku's config variables.)
let getRecipesByKeyword = (keyword, callback) => {
  let options = {
    url:
      'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=12&query=' +
      keyword,
    headers: {
      'User-Agent': 'request',
      'X-Mashape-Key': PROJECT_KEY,
      'X-Mashape-Host': PROJECT_HOST
    }
  };

  let requestHandler = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      callback(error, null);
    }
  };

  request(options, requestHandler);
};



// This function makes another request to different API endpoint to get detailed recipe info in bulk based on
// recipe ids (which are returned by getRecipesByKeyword method above).
// NOTE: This function and the above function count as two separate API requests.
let getRecipeInfoByIds = (recipes, callback) => {
  // creates recipeIds for search parameter
  recipes = JSON.parse(recipes).results;
  let recipeIds = recipes
    .map((recipe, i) => {
      if (i !== recipes.length - 1) {
        return recipe.id + '%2C';
      } else {
        return recipe.id;
      }
    })
    .join('');

  // (Uses the same API key as getRecipesByKeyword function)
  let options = {
    url:
      'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=' +
      recipeIds,
    headers: {
      'User-Agent': 'request',
      'X-Mashape-Key': PROJECT_KEY,
      'X-Mashape-Host': PROJECT_HOST
    }
  };

  let requestHandler = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      callback(error, null);
    }
  };

  request(options, requestHandler);
};

module.exports = {
  getRecipesByKeyword: getRecipesByKeyword,
  getRecipeInfoByIds: getRecipeInfoByIds
};
