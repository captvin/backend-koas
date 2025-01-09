const rateLimit = require('express-rate-limit');

// Konfigurasi rate limiter
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 detik
  max: 15, // Maksimal 100 permintaan per IP dalam 15 menit
  handler: (req, res) => {
    // Mendapatkan IP dari permintaan
    const ip = req.ip || req.connection.remoteAddress;
    
    // Mengirimkan pesan kesalahan dengan alamat IP
    res.status(429).json({
      status: 429,
      message: `Terlalu banyak permintaan dari IP ${ip} ini. Coba lagi nanti.`,
    });
  },
});

module.exports = limiter;