require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//Passport.js
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

//End Passport.js

var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Passport.js
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//End of Passport.js

//new hbs for passport.js
app.set("views", "./views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

//end of new hbs for passport.js

// Routes
var authRoute = require("./routes/auth.js")(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./config/passport/passport.js")(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser. Database looks fine",
      PORT,
      PORT
    );
  });
});

module.exports = app;
