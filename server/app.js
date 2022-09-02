const express =  require('express')
const router = require('./src/router')
const cors = require('cors')
const { fail } = require('./src/utils/response')
const { whiteList } = require('./src/config/token')

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:4173'],
    credentials: true,
    exposedHeaders: 'Authorization',
}))
app.all('/api/*', (req, res,next) => {
    if (whiteList.includes(req.path)) {
        next()
    } else {
        const token = req.headers.authorization
        if (token) {
            next()
        } else {
            res.status(401).send(fail('Invalid Token!'))
        }
    }
})
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

router(app)

app.listen(9999, () => {
    console.log('server running at http://localhost:9999')
})

