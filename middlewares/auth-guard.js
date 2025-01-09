const jwt = require('jsonwebtoken')
const { Forbidden, Unauthorized } = require('http-errors')
const { ErrorHandler } = require('@middlewares/error-handler')
const { users } = require('@models')

require('dotenv').config()
var { JWT_SECRET_KEY } = process.env

module.exports = function (req, res, next) {
    var token = req.headers.authorization
    if (token == undefined || null) {
        ErrorHandler(Unauthorized(), req, res)
    }
    else {
        const tokenx = token
        token = token.slice(7)
        jwt.verify(token, JWT_SECRET_KEY, async (error, payload) => {
            if (error) {
                ErrorHandler(Unauthorized(), req, res)
            } else {
                const user = payload

                

                const chk = await users.findByPk(user.id)
                
                if(chk.token === token){
                    req.user = {
                        ...user,
                    }
                    next()
                } else {
                    ErrorHandler(Unauthorized(), req, res)
                }
                
                
            }
        })
    }
}