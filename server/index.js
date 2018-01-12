const express = require('express');
const bodyParser = require('body-parser');
const database = require('../database/index');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// For componentDidMount - (possibility)
// app.get('/recipes', function (req, res) {
//   recipes.selectAll(function(err, data) {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post('/recipes', (req, res, next) => {
  let keywords = req.body.keywords;
  let budget = req.body.budget;

  database.getRecipesFromMongo(budget, keywords, (data) => {
    if (data.length >= 12) {
      console.log('there are more than 12 results.')
      res.status(201).json(data);
    } else {
      console.log('getting data from API')
      database.getDataFromAPI(keywords, (apidata) => {
        database.saveRecipesToMongo(apidata, () => {
          console.log('getting data from database')
          database.getRecipesFromMongo(budget, keywords, (data) => {
            console.log('found data in database')
            res.status(201).json(data);
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
