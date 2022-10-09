const express = require('express')
const Mock = require('mockjs')
const Code = require('svg-captcha')
const { fail, success } = require('../utils/response')

const router = express.Router()

const name = 'admin'
const pwd = '123456'
const userInfo = {
    id: 1,
    username: 'admin',
    gender: 1,
    email: 'admin@163.com',
    avatar: 'http://192.168.0.110:9999/public/avatar/avatar.jpg'
}
let verifyCode = void 0

router.get('/code', (req, res) => {
    const { text, data } = Code.create({
        size: 4, // 随机生成验证码长度
        ignoreChars: "0o1iIl",
        noise: 3,  // 设置干扰线的数量
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: "#fff", // 背景颜色
        fontSize: 60, // 设置字体大小
        width: 150, //宽度
        height: 40, //高度
    })
    verifyCode = text.toLocaleLowerCase()
    res.send(success(data))
})

router.post('/login', (req, res) => {
    const { username, password, code } = req.body
    if (code.toLocaleLowerCase() !== verifyCode) {
        return res.send(fail('验证码错误'))
    }
    if (name === username && pwd === password) {
        res.setHeader('Authorization', JSON.stringify(userInfo))
        return res.send(success(userInfo, '登录成功'))
    }
    res.send(fail('账号或密码错误'))
})

module.exports = router