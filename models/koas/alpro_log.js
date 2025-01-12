const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alpro_log', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_alpro: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'alpro',
        key: 'id'
      }
    },
    id_user: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbl_users',
        key: 'id'
      }
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_pekerjaan: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'alpro_log',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "alpro_log_alpro_FK",
        using: "BTREE",
        fields: [
          { name: "id_alpro" },
        ]
      },
      {
        name: "alpro_log_user_FK",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
