require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await sequelize.sync();
        console.log("Database connected");

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server", err);
    }
})();
