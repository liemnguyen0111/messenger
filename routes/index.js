const router = require('express').Router()

router.use("/api", require("./userRoutes.js"));
router.use("/api", require("./messagesRoutes.js"));

module.exports = router