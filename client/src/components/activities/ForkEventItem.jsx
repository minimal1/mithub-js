/** @format */
import React from "react";
import RepoInfo from "./RepoInfo";

function ForkEventItem({ item }) {
  const { type, username, avatarUrl, fromRepo, toRepo, createdAt } = item;

  return (
    <div className='event item-fork'>
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
          forked{" "}
          <a href={`https://github.com/${toRepo}`}>
            <span className='event__repo'>{toRepo}</span>
          </a>{" "}
          from{" "}
          <a href={`https://github.com/${fromRepo}`}>
            <span className='event__repo'>{fromRepo}</span>
          </a>
          <span className='event__timestamp'>{createdAt}</span>
        </div>
        <RepoInfo repoName={fromRepo} />
      </div>
    </div>
  );
}

export default ForkEventItem;
