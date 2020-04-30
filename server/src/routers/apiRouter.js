/** @format */

import express from "express";
import routes from "../routes";
import { postAccessToken } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.accessToken, postAccessToken);

export default apiRouter;
