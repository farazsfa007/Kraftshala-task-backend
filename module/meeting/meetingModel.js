const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("../user/userModel");

const Meeting = sequelize.define("Meeting", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });

module.exports = Meeting;
