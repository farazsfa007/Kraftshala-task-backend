const User = require("./userModel");

exports.createUser = async data => {
    if (!data.name || !data.email) {
        const err = new Error("Name and email are required");
        err.status = 400;
        throw err;
    }
    return User.create(data);
};

exports.getUserById = async id => {
    const user = await User.findByPk(id);
    if (!user) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    return user;
};
