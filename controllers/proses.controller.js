const { OTP, alpro, alpro_log } = require("@modelsKoas");
const { NotFound, Forbidden } = require("http-errors");
const { getIO } = require("@utils/webSocket");
const { cekUserByToken } = require("@controllers/login.controller");
const {
  Op,
  Sequelize,
  QueryTypes,
  fn,
  col,
  literal,
  where,
} = require("sequelize");
const crypto = require("crypto");

const io = getIO();

async function getOTP(req, res, next) {
  const { alproId } = req.body;
  const token = req.user.token;
  const otp = await generateSecureOTP();

  const dt = {
    id_alpro: alproId,
    code: otp,
    session: token,
  };

  const result = await OTP.create(dt);

  if (result) {
    await io.to(token).emit("reichiveOTP", { otp });
    res.status(200).json();
  }
}

async function verifyOtp(req, res, next) {
  const { otp, alproName } = req.body;

  const chk = await alpro.findOne({
    where: {
      name: alproName,
    },
    attributes: ["id"],
  });

  //   console.log(chk)

  const result = await OTP.findOne({
    where: { id_alpro: chk.id },
    order: [["createdAt", "DESC"]],
  });

  if (result && result.code === otp) {
    await io.to(result.session).emit("verifyOtpSuccess", {});
    await OTP.destroy({ where: { id_alpro: chk.id } });
    await alpro.update({ status: "BUKA" }, { where: { id: chk.id } });
    const user = await cekUserByToken(result.token);
    await alpro_log.create({
      id_alpro: chk.id,
      id_user: user.id,
      action: "DIBUKA",
    });
    res.status(200).json({ status: true });
  } else {
    res.status(401).json({ status: false });
  }
}

async function close(req, res) {
  const { alproName } = req.body;

  try {
    const chk = await alpro.findOne({
      where: {
        name: alproName,
      },
      attributes: ["id"],
    });

    const latestLog = await alpro_log.findOne({
      where: { id_alpro: chk.id },
      order: [["createdAt", "DESC"]], // Urutkan berdasarkan waktu terbaru
    });

    if (latestLog.action == "DIBUKA") {
      const dt = {
        id_alpro: latestLog.id_alpro,
        id_user: latestLog.id_user,
        action: "DITUTUP",
        id_pekerjaan: latestLog.id_pekerjaan,
      };
      await alpro_log.create(dt);
      await alpro.update({ status: "TUTUP" }, { where: { id: chk.id } });
    }

    await io.to(chk.id_user).emit("signalTutup");

    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
}

async function generateSecureOTP() {
  const otp = await crypto.randomInt(100000, 1000000); // Menghasilkan angka acak dari 100000 hingga 999999
  return otp.toString(); // Ubah menjadi string jika diperlukan
}

module.exports = {
  getOTP,
  verifyOtp,
  close,
};
