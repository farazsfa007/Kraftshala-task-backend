const express = require("express");
const controller = require("./meetingController");

const router = express.Router();

router.post("/", controller.createMeeting);
router.get("/", controller.getMeetings);
router.get("/:id", controller.getMeeting);
router.put("/:id", controller.updateMeeting);
router.delete("/:id", controller.deleteMeeting);

module.exports = router;
