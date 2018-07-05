'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  });

  Task.associate = function (models) {
    models.Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
