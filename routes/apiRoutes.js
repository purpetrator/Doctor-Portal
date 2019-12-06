var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/patients", function(req, res) {
    db.Patient.findAll({}).then(function(dbPatients) {
      res.json(dbPatients);
    });
  });

  app.get("/api/patients/bydoctor", function(req, res) {
    db.Patient.findAll({
      where: { drid: req.user.id }
    }).then(function(dbPatients) {
      res.json(dbPatients);
    });
  });

  app.get("/api/patient/:id", function(req, res) {
    db.Patient.findOne({ where: { id: req.params.id } }).then(function(
      dbPatient
    ) {
      console.log("DB PATIENT", dbPatient);
      res.json(dbPatient);
    });
  });

  app.get("/api/visits/:pid", function(req, res) {
    db.Visit.findAll({
      where: { pid: req.params.pid }
    }).then(function(dbVisits) {
      res.json(dbVisits);
    });
  });

  // Create a new Patient
  app.post("/api/patients", function(req, res) {
    req.body.drid = req.user.id;
    console.log(req.body);
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

  app.put("/api/patients/:id", function(req, res) {
    db.Patient.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbPatient) {
      res.json(dbPatient);
    });
  });
};
