const express = require("express");
const router = express.Router();
const SCHEMAS = require("../../middlewares/validation/schemas");
const { userController } = require("../../controllers");
const { validateBody } = require("../../middlewares/validation/validate");

router.post("/", validateBody(SCHEMAS.USER.USER_CREATE_SCHEMA), userController.registerUser);

module.exports = router;
