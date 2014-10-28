var express    = require('express'),
    app        = express();

var port = 8080;

// Register routes
var zisterne = require('./routes/route_zisterne.js');
app.use('/zisterne', zisterne);

// redirect root access to index.html
app.get("/", function (req, res) {
  res.redirect("/index.html");
});

// register middleware
app.use(express.static(__dirname + '/public'));

app.listen(port);
