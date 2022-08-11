const userRouter = require('./user')

const router = app => {
    app.use('/api/user', userRouter)
}

module.exports = router