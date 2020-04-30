/** @format */

import UserStroe from "./user";

class RootStore {
  constructor() {
    this.user = new UserStroe(this);
  }
}

export default RootStore;
