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
  console.log('getRecipesByKeyword is running');
  let options = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=12&query=' + keyword,
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
  recipes = JSON.parse(recipes).results;
  let recipeIds = recipes.map((recipe, i) => {
    if (i !== (recipes.length - 1)) {
      return recipe.id + '%2C';
    } else {
      return recipe.id;
    }
  }).join('');

  let options = {
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=' + recipeIds,
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
