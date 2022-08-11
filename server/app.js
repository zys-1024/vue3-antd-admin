const express =  require('express')
const router = require('./src/router')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    exposedHeaders: 'Authorization',
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

router(app)

app.listen(9999, () => {
    console.log('server running at http://localhost:9999')
})

