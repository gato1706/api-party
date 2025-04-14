const router = require('express').Router()

//services router

const serviceRouter = require('./services')

router.use("/", serviceRouter)

module.exports = router;