/** @format */

import { observable, action } from "mobx";

export default class UserStore {
  @observable user = null;

  @action login = () => {};

  @action logout = () => {};
}
