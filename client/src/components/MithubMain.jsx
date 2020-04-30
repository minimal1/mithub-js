/** @format */

import React from "react";
import MithubMainTemplete from "./MithubMainTemplete";
import Header from "./Header";
import EventItemList from "./EventItemList";
import RepoItemList from "./RepoItemList";
import MoreButton from "./MoreButton";

function MithubMain(props) {
  return (
    <MithubMainTemplete
      header={<Header />}
      repositories={<RepoItemList />}
      activities={<EventItemList />}
      more={<MoreButton />}
    />
  );
}

export default MithubMain;
