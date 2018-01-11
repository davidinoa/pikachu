const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


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
