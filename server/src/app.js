import express from "express";
import cors from "cors";
import config from "./config/index.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;

