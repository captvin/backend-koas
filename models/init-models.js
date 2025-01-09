var DataTypes = require("sequelize").DataTypes;
var _OTP = require("./OTP");
var _alpro = require("./alpro");

function initModels(sequelize) {
  var OTP = _OTP(sequelize, DataTypes);
  var alpro = _alpro(sequelize, DataTypes);


  return {
    OTP,
    alpro,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
