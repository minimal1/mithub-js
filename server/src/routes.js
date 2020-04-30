/** @format */
const AUTH = "/auth";
const GH_LOGIN = "/github";
const GH_CALLBACK = "/github/callback";

const API = "/api";
const ACCESS_TOKEN = "/access_token";
const RECV_EVENTS = "/received_events";

const routes = {
  auth: AUTH,
  github: GH_LOGIN,
  githubCallback: GH_CALLBACK,
  api: API,
  accessToken: ACCESS_TOKEN,
  recvEvents: RECV_EVENTS,
};

export default routes;
