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

// fetch recipes based on budget
// example: user inputs $20 budget for 2 servings => get recipes with servingPrice of $10 or less.

// get 10 results per keyword query
let getRecipesByKeyword = (keyword, callback) => {
  let options = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&query=' + keyword,
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

// getRecipesByKeyword('chicken', console.log);

// get recipe info in bulk based on recipe ids.
let getRecipeInfoByIds = (recipes, callback) => {
  // creates recipeIds for search parameter
  let recipeIds = recipes.map((recipe, i) => {
    if (i !== recipes.length - 1) {
      return recipe.id + '%';
    } else {
      return recipe.id;
    }
  }).join('');

  let options = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=' + recipeIds,
    headers: {
      'User-Agent': 'request',
      'X-Mashape-Key': config.PROJECT_KEY,
      'X-Mashape-Host': config.PROJECT_HOST
    }
  };

  let requestHandler = (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(null, body);
    } else {
      callback(error, null);
    }
  };
};

module.exports = {
  getRecipesByKeyword: getRecipesByKeyword,
  getRecipeInfoByIds: getRecipeInfoByIds
};
