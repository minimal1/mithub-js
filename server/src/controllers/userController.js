/** @format */
import axios from "axios";
import passport from "passport";

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (accessToken, _, profile, cb) => {
  console.log(accessToken);
  // return cb(null, "TESTING");
  // return access token
};

export const postGithubLogin = (req, res) => {
  console.log(req);
  res.redirect("/");
};

export const postAccessToken = async (req, res) => {
  const {
    body: { code },
  } = req;

  try {
    const resFromGH = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.GH_ID, // 내 APP의 정보
        client_secret: process.env.GH_SECRET, // 내 APP의 정보
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    const token = resFromGH.data.access_token;
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const userData = {
      access_token: token,
      user_name: data.login,
      avatar_url: data.avatar_url,
      email: data.email,
    };
    return res.json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

  // JWT 토큰을 발행합니다.
  // const access_token = await jwt.generate({ login: data.login, id: data.id });

  // return res.json({ access_token });
};
