const Router = require('express')
const router = new Router()
const thingRouter = require('./thingRouter')
const typeRouter = require('./typeRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/type', typeRouter)
router.use('/thing', thingRouter)

module.exports = router