// const { ct0_bromo_odp, ct0_bromo, SERVICE_INFO_R5, sequelize, ODP_IHLD, ODP_IHLD3, ODP_IHLD_KOMER, ODP_NEAR_KOMER, ODP_NEAR_KOMER_3 } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { getIO } = require('@utils/webSocket');
const { Op, Sequelize, QueryTypes, fn, col, literal, where } = require('sequelize')
const path = require('path')
const fs = require('fs')

const { json } = require('body-parser')
const moment = require('moment-timezone')
const axios = require('axios')



const tmp = require('tmp');
const { exit } = require('process')
const io = getIO()

async function getOTP(req, res, next) {
    const alproId = 1
    const userId = 1
    const otp = '12345'


    await io.emit('reichiveOTP', {otp, userId, alproId})

    res.status(200).json()
}

async function verifyOtp(req, res, next){
    await io.emit('verifyOtpSuccess', {})
    res.status(200).json()
}




module.exports = {
    getOTP,
    verifyOtp
}