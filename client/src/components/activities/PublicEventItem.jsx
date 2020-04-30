/** @format */
import React from "react";
import RepoInfo from "./RepoInfo";

function PublicEventItem({ item }) {
  const { type, username, avatarUrl, repoName, createdAt } = item;

  return (
    <div className='event item-public'>
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
          made{" "}
          <a href={`https://github.com/${repoName}`}>
            <span className='event__repo'>{repoName}</span>
          </a>{" "}
          public <span className='event__timestamp'>{createdAt}</span>
        </div>
        <RepoInfo repoName={repoName} />
      </div>
    </div>
  );
}

export default PublicEventItem;
