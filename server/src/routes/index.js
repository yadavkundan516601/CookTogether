import { Router } from "express";
import { readdirSync } from "fs";
import { basename, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import config from "../config/index.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routesPath = resolve(__dirname);

const loadRoutes = async () => {
    const files = readdirSync(routesPath).filter(
        (file) => file.endsWith("Routes.js") && file !== basename(__filename) && file !== "index.js"
    );

    for (const file of files) {
        const importPath = `file://${resolve(routesPath, file)}`;
        const { default: route } = await import(importPath);

        const name = file.replace("Routes.js", "").toLowerCase();
        const routePrefix = name === "auth" ? `${config.apiPrefix}/auth` : `${config.apiPrefix}/${name}`;
        router.use(routePrefix, route);
    }
};

loadRoutes().catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to load routes:", err);
});

export default router;

