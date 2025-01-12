var DataTypes = require("sequelize").DataTypes;
var _OTP = require("./OTP");
var _alpro = require("./alpro");
var _alpro_log = require("./alpro_log");

// var _M_WITEL = require("../users/M_WITEL");
// var _tbl_companny = require("../users/M_WITEL");
// var _tbl_roles = require("../users/M_WITEL");
var _tbl_users = require("../users/tbl_users");

function initModels(sequelize) {
  var OTP = _OTP(sequelize, DataTypes);
  var alpro = _alpro(sequelize, DataTypes);
  var alpro_log = _alpro_log(sequelize, DataTypes);

  // var M_WITEL = _M_WITEL(sequelize, DataTypes);
  // var tbl_companny = _tbl_companny(sequelize, DataTypes);
  // var tbl_roles = _tbl_roles(sequelize, DataTypes);
  var tbl_users = _tbl_users(sequelize, DataTypes);

  alpro_log.belongsTo(alpro, { as: "id_alpro_alpro", foreignKey: "id_alpro"});
  alpro.hasMany(alpro_log, { as: "alpro_logs", foreignKey: "id_alpro"});
  alpro_log.belongsTo(tbl_users, { as: "id_user_tbl_user", foreignKey: "id_user"});
  tbl_users.hasMany(alpro_log, { as: "alpro_logs", foreignKey: "id_user"});

  return {
    OTP,
    alpro,
    alpro_log,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
