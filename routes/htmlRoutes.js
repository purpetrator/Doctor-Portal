var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Patient.findAll({}).then(function(dbPatients) {
      res.render("index", {
        msg: "Welcome!",
        patients: dbPatients
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/patients/:id", function(req, res) {
    db.Patient.findOne({ where: { id: req.params.id } }).then(function(
      dbPatient
    ) {
      res.render("example", {
        patient: dbPatient
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
