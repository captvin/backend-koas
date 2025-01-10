const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('M_WITEL', {
    WITEL: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    LATITUDE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LONGITUDE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    REG: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'M_WITEL',
    timestamps: false
  });
};
