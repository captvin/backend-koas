'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Konfigurasi untuk database koas
const configKoas = require(__dirname + '/../config/config.js')[env];

// Konfigurasi untuk database users
const configUsers = require(__dirname + '/../config/config2.js')[env];

const db = {};

// Inisialisasi koneksi untuk database koas
let sequelizeKoas;
if (configKoas.use_env_variable) {
  sequelizeKoas = new Sequelize(process.env[configKoas.use_env_variable], configKoas);
} else {
  sequelizeKoas = new Sequelize(configKoas.database, configKoas.username, configKoas.password, configKoas);
}

// Inisialisasi koneksi untuk database users
let sequelizeUsers;
if (configUsers.use_env_variable) {
  sequelizeUsers = new Sequelize(process.env[configUsers.use_env_variable], configUsers);
} else {
  sequelizeUsers = new Sequelize(configUsers.database, configUsers.username, configUsers.password, configUsers);
}

// Fungsi untuk membaca dan memuat model dari direktori tertentu
function loadModels(directory, sequelizeInstance) {
  const models = {};
  fs
    .readdirSync(directory)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(directory, file))(sequelizeInstance, Sequelize.DataTypes);
      models[model.name] = model;
    });
  return models;
}

// Memuat model dari direktori koas
const koasModels = loadModels(path.join(__dirname, 'koas'), sequelizeKoas);

// Memuat model dari direktori users
const usersModels = loadModels(path.join(__dirname, 'users'), sequelizeUsers);

// Menggabungkan semua model ke objek `db`
db.koas = koasModels;
db.users = usersModels;

// Menambahkan properti sequelize ke setiap grup model
db.koas.sequelize = sequelizeKoas;
db.koas.Sequelize = Sequelize;

db.users.sequelize = sequelizeUsers;
db.users.Sequelize = Sequelize;

module.exports = db;
