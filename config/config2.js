require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME2,
    password: process.env.DB_PASSWORD2,
    database: process.env.DB_DATABASE2,
    host: process.env.DB_HOST2,
    dialect: process.env.DB_DIALECT2,
    // logging: process.env.DB_LOGGING,
    logging: true,
    timezone: '+07:00', // Sesuaikan dengan zona waktu lokal Anda
    dialectOptions: {
      // useUTC: false, // Menggunakan waktu lokal
      timezone: 'local', // Memastikan menggunakan waktu lokal
      connectTimeout: 300000,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,      // Waktu idle maksimum untuk koneksi dalam pool
      acquire: 300000,  // Timeout maksimum dalam milidetik untuk mendapatkan koneksi (5 menit)
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // logging: process.env.DB_LOGGING,
    logging: false,
    timezone: '+07:00', // Sesuaikan dengan zona waktu lokal Anda
    dialectOptions: {
      // useUTC: false, // Menggunakan waktu lokal
      timezone: 'local', // Memastikan menggunakan waktu lokal
      connectTimeout: 300000,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,      // Waktu idle maksimum untuk koneksi dalam pool
      acquire: 300000,  // Timeout maksimum dalam milidetik untuk mendapatkan koneksi (5 menit)
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    // logging: process.env.DB_LOGGING,
    logging: false,
    timezone: '+07:00', // Sesuaikan dengan zona waktu lokal Anda
    dialectOptions: {
      // useUTC: false, // Menggunakan waktu lokal
      timezone: 'local', // Memastikan menggunakan waktu lokal
      connectTimeout: 300000,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,      // Waktu idle maksimum untuk koneksi dalam pool
      acquire: 300000,  // Timeout maksimum dalam milidetik untuk mendapatkan koneksi (5 menit)
    },
  },
}



