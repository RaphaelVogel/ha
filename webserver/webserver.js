var express    = require('express'),
    app        = express();

global.fake = true;

// Register routes
var weather = require('./routes/route_weather.js');
app.use('/weather', weather);

var solar = require('./routes/route_solar.js');
app.use('/solar', solar);

// redirect root access to index.html
app.get("/", function (req, res) {
  res.redirect("/index.html");
});

// register middleware
app.use(express.static(__dirname + '/'));

app.listen(8080);
