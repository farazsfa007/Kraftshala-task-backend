const asyncHandler = require("../../utils/asyncHandler");
const userService = require("./userService");

exports.createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
});
