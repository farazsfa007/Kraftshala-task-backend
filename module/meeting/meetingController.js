const asyncHandler = require("../../utils/asyncHandler");
const service = require("./meetingService");

exports.createMeeting = asyncHandler(async (req, res) => {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
});

exports.getMeetings = asyncHandler(async (req, res) => {
    const meetings = await service.getMeetings(req.query);
    res.json(meetings);
});

exports.getMeeting = asyncHandler(async (req, res) => {
    const meeting = await service.getMeetingById(req.params.id);
    res.json(meeting);
});

exports.updateMeeting = asyncHandler(async (req, res) => {
    const meeting = await service.updateMeeting(req.params.id, req.body);
    res.json(meeting);
});

exports.deleteMeeting = asyncHandler(async (req, res) => {
    await service.deleteMeeting(req.params.id);
    res.status(204).send();
});
