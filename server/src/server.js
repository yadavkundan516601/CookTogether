import { sequelize } from "./db/index.js";
import app from "./app.js";
import config from "./config/index.js";

const PORT = config.port || 4000;

const initService = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("SQLite DB synced at", config.dbFile);

        app.listen(PORT, () => {
            console.log(`CookTogether server started on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

initService();

