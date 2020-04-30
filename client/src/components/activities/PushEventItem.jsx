/** @format */
import React from "react";
import Commit from "./Commit";
import "./PushEventItem.css";

function PushEventItem({ item }) {
  const {
    username,
    avatarUrl,
    repoName,
    createdAt,
    size,
    ref,
    before,
    head,
    commits,
  } = item;
  console.log(ref, ref.split("/"));
  const branch = ref.split("heads/")[1];

  const commitList = [];

  if (size > 2) {
    commitList.push(<Commit key={1} commit={commits[0]} repoName={repoName} />);
    commitList.push(<Commit key={2} commit={commits[1]} repoName={repoName} />);
    commitList.push(
      <a
        href={`https://github.com/${repoName}/compare/${before.slice(
          0,
          10
        )}...${head.slice(0, 10)}`}
        className='push__more-commits'
      >
        {size - 2} more {size - 2 > 1 ? "commits" : "commit"} >>
      </a>
    );
  } else {
    commitList.push(<Commit key={1} commit={commits[0]} repoName={repoName} />);
  }

  return (
    <div className='event item-pullrequest'>
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
          pushed to{" "}
          <a href={`https://github.com/${repoName}`}>
            <span className='event__repo'>{repoName}</span>
          </a>
          <span className='event__timestamp'>{createdAt}</span>
        </div>
        <div className='event__detail'>
          <div className='event__push push'>
            {size} {size > 1 ? "commits" : "commit"} to{" "}
            <a href={`https://github.com/${repoName}/tree/${branch}`}>
              <span className='push__branch'>{branch}</span>
            </a>
            <div className='push__commits'>{commitList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PushEventItem;
