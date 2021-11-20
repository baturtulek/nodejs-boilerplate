const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers");
const { validateBody } = require("../../middlewares/validation/validate");
const SCHEMAS = require("../../middlewares/validation/schemas");

router.post("/login", validateBody(SCHEMAS.AUTH.LOGIN_SCHEMA), authController.loginUser);

module.exports = router;
