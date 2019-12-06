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
  return Visit;
};
