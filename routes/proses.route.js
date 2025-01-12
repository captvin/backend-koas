const Router = require('express').Router()
const { getOTP, verifyOtp, close } = require('@controllers/proses.controller')
const authGuard = require('@middlewares/auth-guard')
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage
})

Router
  // .post('/uploadExcel', upload.single('files'), uploadExcel)
  // .get('/insertNear', insertNear)
  .post('/verifyOtp', verifyOtp)
  .post('/close', close)
  .use(authGuard)
  // .post('/getODP', getODP)
  // .post('/detail', detail)
  // .post('/inet', getInet)
  // .get('/witel', getWitel)
  // .get('/witelAvail', getWitelAvail)
  // .post('/avail', getAvail)
  // .post('/near', near)
  .post('/otp', getOTP)
  
  


module.exports = { Router, route: '' }