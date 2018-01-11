var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/recipes', (req, res) => {
  // get 12 recipes with user input
  // send data fetched from Mongo back to the client
    // error handling 
});

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


let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
