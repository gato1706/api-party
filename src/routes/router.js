const router = require("express").Router();

//services router

const serviceRouter = require("./services");

router.use("/", serviceRouter);

//parties routes
const partyRouter = require("./parties");

router.use("/", partyRouter);

module.exports = router;
