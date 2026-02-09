const { Op } = require("sequelize");
const Meeting = require("./meetingModel");

async function checkConflict({ userId, startTime, endTime, excludeId }) {
    return Meeting.findOne({
        where: {
        userId,
        ...(excludeId && { id: { [Op.ne]: excludeId } }),
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime }
        }
    });
}

exports.createMeeting = async data => {
    const { userId, title, startTime, endTime } = data;

    if (!userId || !title || !startTime || !endTime) {
        const err = new Error("All fields are required");
        err.status = 400;
        throw err;
    }

    if (new Date(startTime) >= new Date(endTime)) {
        const err = new Error("startTime must be before endTime");
        err.status = 400;
        throw err;
    }

    const conflict = await checkConflict({ userId, startTime, endTime });
    if (conflict) {
        const err = new Error("Time slot already booked");
        err.status = 400;
        throw err;
    }

    return Meeting.create(data);
};

exports.getMeetings = async query => {
    const where = {};
    if (query.userId) where.userId = query.userId;
    if (query.startDate && query.endDate) {
        where.startTime = { [Op.gte]: query.startDate };
        where.endTime = { [Op.lte]: query.endDate };
    }
    return Meeting.findAll({ where });
};

exports.getMeetingById = async id => {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
        const err = new Error("Meeting not found");
        err.status = 404;
        throw err;
    }
    return meeting;
};

exports.updateMeeting = async (id, data) => {
    const meeting = await exports.getMeetingById(id);

    const conflict = await checkConflict({
        userId: meeting.userId,
        startTime: data.startTime,
        endTime: data.endTime,
        excludeId: id
    });

    if (conflict) {
        const err = new Error("Time slot already booked");
        err.status = 400;
        throw err;
    }

    return meeting.update(data);
};

exports.deleteMeeting = async id => {
    const meeting = await exports.getMeetingById(id);
    await meeting.destroy();
};
