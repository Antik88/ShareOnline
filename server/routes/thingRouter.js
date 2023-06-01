const Router = require('express')
const router = new Router()
const thingController = require('../controllers/thingController')


router.post('/', thingController.create)
router.get('/', thingController.getAll)
router.get('/:id', thingController.getOne)

module.exports = router