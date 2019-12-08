var Patient = require("./patient.js");

module.exports = function(sequelize, DataTypes) {
  var Visit = sequelize.define("Visit", {
    date: {
      type: DataTypes.STRING
    },
    symptoms: {
      type: DataTypes.TEXT
    },
    rx: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    pid: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
    }
  });

  Visit.associate = function(models) {
    Visit.belongsTo(models.Patient, {
      foreignKey: {
        model: Patient,
        key: "id"
      }
    });
  };

  return Visit;
};
