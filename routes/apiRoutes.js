var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/patients", function(req, res) {
    db.Patient.findAll({}).then(function(dbPatients) {
      res.json(dbPatients);
    });
  });

  // Create a new Patient
  app.post("/api/patients", function(req, res) {
    db.Patient.create(req.body).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });

  // Delete an Patient by id
  app.delete("/api/patients/:id", function(req, res) {
    db.Patient.destroy({ where: { id: req.params.id } }).then(function(
      dbPatient
    ) {
      res.json(dbPatient);
    });
  });
};
