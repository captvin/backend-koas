const { tbl_users } = require('@modelsUsers')
const { Sequelize, Op } = require('sequelize')
const { tokenGenerator } = require('@utils/tokenGenerator')
const bcrypt = require('bcrypt');
const { hashPass } = require('@utils/hashPass')
const { format } = require('date-fns')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

// const otpStore = new Map();

async function login(req, res, next) {
    const allAttributes = Object.keys(tbl_users.rawAttributes);

    // Filter kolom yang tidak mengandung kata "token"
    const excludedAttributes = allAttributes.filter(attr => !attr.toLowerCase().includes('token'));
    console.log(excludedAttributes)

    // try{

    const { username, password } = req.body

    const result = await tbl_users.findOne({ 
        where: Sequelize.where(Sequelize.fn('BINARY', Sequelize.col('username')), username),
        attributes: excludedAttributes
    })
    if (!result) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    // console.log(res)
    // console.log(res.header)


    // const { password } = req.body
    const password_match = await bcrypt.compare(password, result.password)

    if (password_match) {

        const data = {
            id: result.id,
            id_telegram: result.id_telegram,
            username: result.username,
            role: result.role,
            name: result.name,
            witel: result.witel,
            description: result.description
        }
        const token = await tokenGenerator(data, '30d')

        const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        await tbl_users.update({ last_login: now,  token_koas: token }, { where: { id: result.id } })

        return res.json({
            logged: true,
            data: result,
            token: token
        })
    }

    else {
        return res.status(401).json({
            message: "Wrong password"
        })
    }


}
const decryptId = (encryptedId) => {
    const encryptionKey = process.env.JWT_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), encryptionKey);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return originalId;
}

async function cekUserByToken(token){
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlkX3RlbGVncmFtIjoiMTIzNDU2NyIsInVzZXJuYW1lIjoiMjQwNTAwMDUiLCJuYW1lIjoiTVVIQU1NQUQgQURIRSBBTFZJTiIsImlhdCI6MTczNjY4NDk1NywiZXhwIjoxNzM5Mjc2OTU3fQ.DPAq5m79tYAZfXkPGDv_xxVpOsgFTySZgTwKpAQhe8M"
    var { JWT_SECRET_KEY } = process.env
    // token = token.slice(7)
    const res =  jwt.verify(token, JWT_SECRET_KEY)
    return res
}

async function changePass(req, res, next) {
    const { oldPass, newPass } = req.body
    const id = req.user.id

    const check = await tbl_users.findByPk(id)

    const password_match = await bcrypt.compare(oldPass, check.password)

    if (password_match) {
        const newPassEncrypt = String(await hashPass(newPass));
        console.log(newPassEncrypt)
        const result = await tbl_users.update({ password: newPassEncrypt }, { where: { id } })

        return result
            ? res.status(200).json("Success")
            : res.status(500).json('Server Error')
    } else {
        return res.status(401).json({ message: "Password Salah" })
    }
}

async function destroy(req, res) {
    const id = await decryptIdreq.body.id
    try {
        await tagtiangbot_user_list.destroy({ where: { id } })

        res.status(200).json({ message: "Berhasil menghapus data" })
    } catch {

    }
}

async function findById(req, res) {
    const id = await decryptId(req.body.id)
    try {
        const result = await tagtiangbot_user_list.findByPk(id, {
            attributes: ['username', 'name', 'witel', 'role', 'last_login_at', 'description', 'username_telegram', 'id_telegram']
        })

        if (result && result.last_login_at) {
            const forDate = new Date(result.last_login_at).toLocaleString(); // Format date as local string
            result.last_login_at = forDate
        }

        res.status(200).json(result)

    } catch {
        res.status(500).json({ message: 'gagal mendapatkan data' })
    }
}





module.exports = {
    login,
    changePass,
    findById,
    cekUserByToken
}

