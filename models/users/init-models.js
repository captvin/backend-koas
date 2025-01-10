var DataTypes = require("sequelize").DataTypes;
var _M_WITEL = require("./M_WITEL");
var _tbl_companny = require("./tbl_companny");
var _tbl_roles = require("./tbl_roles");
var _tbl_users = require("./tbl_users");

function initModels(sequelize) {
  var M_WITEL = _M_WITEL(sequelize, DataTypes);
  var tbl_companny = _tbl_companny(sequelize, DataTypes);
  var tbl_roles = _tbl_roles(sequelize, DataTypes);
  var tbl_users = _tbl_users(sequelize, DataTypes);


  return {
    M_WITEL,
    tbl_companny,
    tbl_roles,
    tbl_users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
