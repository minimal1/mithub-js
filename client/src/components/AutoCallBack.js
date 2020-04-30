/** @format */

import Axios from "axios";
import { inject, observer } from "mobx-react";

function AutoCallBack({ location, history, onLogin }) {
  async function getToken() {
    let { search } = location;
    search = search.split("=")[1];
    try {
      const { status, data } = await Axios.post("/api/access_token", {
        code: search,
      });

      if (status === 200) onLogin(data);
      history.push("/");
    } catch (error) {
      history.push("/error");
    }
  }

  getToken();

  return null;
}

export default inject(({ user }) => ({ onLogin: user.login }))(
  observer(AutoCallBack)
);
