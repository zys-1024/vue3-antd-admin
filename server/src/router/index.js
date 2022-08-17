const userRouter = require('./user')
const routesRouter = require('./routes')

const router = app => {
    app.use('/api/user', userRouter)
    app.use('/api/router', routesRouter)
}

module.exports = router