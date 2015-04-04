require('rootpath')(); // Little helper to make node.js require relative to your project root

var express = require('express');

var app = express();

app.use(express.static('www'));
//app.use(require('express-promise')());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// TODO :  Just add anything in the controllers folder
require('lib/controllers/restaurants.js')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});