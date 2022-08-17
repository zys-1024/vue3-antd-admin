const express = require('express')
const router = express.Router()
const { success } = require('../utils/response')
const routes = require('../config/routes')

router.get('/', (req, res) => {
    res.send(success(routes))
})

module.exports = router