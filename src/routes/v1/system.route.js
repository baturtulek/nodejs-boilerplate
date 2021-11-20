const express = require("express");
const router = express.Router();
const { systemController } = require("../../controllers");

router.get("/healthcheck", systemController.getApiStatus);

module.exports = router;
