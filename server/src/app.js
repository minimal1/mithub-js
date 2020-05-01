/** @format */

import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

if (process.env.PRODUCTION) {
  app.use("/", express.static(path.join(__dirname, "../../client/build/")));
  app.use(
    "/auth/github/callback",
    express.static(path.join(__dirname, "../../client/build/"))
  );
}

app.use(routes.api, apiRouter);

export default app;
