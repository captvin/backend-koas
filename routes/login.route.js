const Router = require('express').Router()
const { login, changePass, cekUserByToken } = require('@controllers/login.controller')
const authGuard = require('@middlewares/auth-guard')

Router
    .post('/login', login)
    .get('/cek', cekUserByToken)
    .use(authGuard)
    .post('/changePass', changePass)

module.exports = { Router, route: '/user' }