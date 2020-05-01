/** @format */
import React from "react";
import RepoInfo from "./RepoInfo";
import { calcTimestamp } from "../../utils/uilts";

function WatchEventItem({ item, accessToken }) {
  const { username, avatarUrl, repoName, createdAt, repoUrl } = item;

  return (
    <div className='event item-watch'>
      <span className='event__author-avatar'>
        <a href={`https://github.com/${username}`}>
          <img src={avatarUrl} alt={username} />
        </a>
      </span>
      <div className='event__contents'>
        <div className='event__title'>
          <a href={`https://github.com/${username}`}>
            <span className='event__author-name'>{username}</span>
          </a>{" "}
          starred{" "}
          <a href={`https://github.com/${repoName}`}>
            <span className='event__repo'>{repoName}</span>
          </a>
          <span className='event__timestamp'>{calcTimestamp(createdAt)}</span>
        </div>
        <RepoInfo
          repoName={repoName}
          repoUrl={repoUrl}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
}

export default WatchEventItem;
