const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database/index');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server's POST route for user's input of budget and keywords (optional).
app.post('/recipes', (req, res, next) => {
  let budget = req.body.budget;
  let keywords = req.body.keywords;

  // server pings database for results that match keywords and budget
  database.getRecipesFromMongo(budget, keywords, (data) => {
    // if there are 12 or more results, send response to client
    if (data.length >= 12) {
      res.json(data);
    } else {
      // if there are less than 12 results, ping API for more.
      database.getDataFromAPI(keywords, (apidata) => {
        // ..and save to database
        database.saveRecipesToMongo(apidata, () => {
          // fetch new records that were just saved to database, and send them to client
          database.getRecipesFromMongo(budget, keywords, (data) => {
            res.json(data);
          });
        });
      });
    }
  });
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
