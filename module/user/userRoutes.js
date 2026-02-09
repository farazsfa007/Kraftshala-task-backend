const express = require("express");
const controller = require("./userController");

const router = express.Router();

router.post("/", controller.createUser);
router.get("/:id", controller.getUser);

module.exports = router;
