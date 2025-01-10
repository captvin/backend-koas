const { OTP } = require('@modelsKoas')
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
    const token = req.body.token
    const otp = '123456'

    const dt = {
        id_alpro: alproId,
        code: otp,
        session: token
    }


    const result = await OTP.create(dt)

    if(result) {
        await io.to(token).emit('reichiveOTP', {otp, userId, alproId})
        res.status(200).json()
    }
}

async function verifyOtp(req, res, next){
    const { otp } = req.body
    alproId = 1

    const result = await OTP.findOne({where: {id_alpro: alproId}, order: [['createdAt', 'DESC']]})

    if(result.code === otp){
        await io.to(result.session).emit('verifyOtpSuccess', {})
        await OTP.destroy({where: {id_alpro: alproId}})
        res.status(200).json()
    }
    

}




module.exports = {
    getOTP,
    verifyOtp
}