/** @format */

import express from "express";
import routes from "../routes";
import { githubLogin, postGithubLogin } from "../controllers/userController";
import passport from "passport";

const globalRouter = express.Router();

// globalRouter.get(routes.github, githubLogin);
// globalRouter.get(
//   routes.githubCallback,
//   passport.authenticate("github"),
//   postGithubLogin
// );

export default globalRouter;
