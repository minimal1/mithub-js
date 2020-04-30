/** @format */

import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import CreateEventItem from "./activities/CreateEventItem";
import ForkEventItem from "./activities/ForkEventItem";
import WatchEventItem from "./activities/WatchEventItem";
import PushEventItem from "./activities/PushEventItem";
import PullRequestEventItem from "./activities/PullReqeustEventItem";
import IssueEventItem from "./activities/IssueEventItem";
import PublicEventItem from "./activities/PublicEventItem";
import "./Event.css";

let itemList = [];

function EventItemList({ userName, loading, loadedActivities }) {
  if (userName === "") {
    itemList = [];
  }
  if (!loading) {
    itemList = loadedActivities.map((item) => {
      const { type } = item;
      switch (type) {
        case "CreateEvent":
          return <CreateEventItem item={item} key={item.id} />;
        case "ForkEvent":
          return <ForkEventItem item={item} key={item.id} />;
        case "WatchEvent":
          return <WatchEventItem item={item} key={item.id} />;
        case "PublicEvent":
          return <PublicEventItem item={item} key={item.id} />;
        case "PushEvent":
          return <PushEventItem item={item} key={item.id} />;
        case "PullRequestEvent":
          return <PullRequestEventItem item={item} key={item.id} />;
        case "IssuesEvent":
          return <IssueEventItem item={item} key={item.id} />;
        default:
          return null;
      }
    });
  }
  return <div>{itemList}</div>;
}

export default inject(({ user }) => ({
  userName: user.userInfo.useraname,
  loading: user.userInfo.loading,
  loadedActivities: user.userInfo.loadedActivities,
}))(observer(EventItemList));
