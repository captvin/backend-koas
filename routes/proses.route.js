const Router = require('express').Router()
const { getOTP, verifyOtp } = require('@controllers/proses.controller')
const authGuard = require('@middlewares/auth-guard')
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage
})

Router
  // .post('/uploadExcel', upload.single('files'), uploadExcel)
  // .get('/insertNear', insertNear)
  // .use(authGuard)
  // .post('/getODP', getODP)
  // .post('/detail', detail)
  // .post('/inet', getInet)
  // .get('/witel', getWitel)
  // .get('/witelAvail', getWitelAvail)
  // .post('/avail', getAvail)
  // .post('/near', near)
  .get('/otp', getOTP)
  .post('/verifyOtp', verifyOtp)
  


module.exports = { Router, route: '' }