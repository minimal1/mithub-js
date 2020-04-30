/** @format */
import React from "react";

function PullRequestEventItem({ item }) {
  const { username, avatarUrl, repoName, createdAt, pull_request } = item;

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
          labeled a pull request with{" "}
          <span
            className='event__label'
            style={{ backgroundColor: `#${pull_request.color}` }}
          >
            {pull_request.label}
          </span>{" "}
          in{" "}
          <a href={`https://github.com/${repoName}`}>
            <span className='event__repo'>{repoName}</span>
          </a>
          <span className='event__timestamp'>{createdAt}</span>
        </div>
        <div className='event__detail labeled'>
          <span className='labeled__icon'>
            <i className='fas fa-code-branch'></i>
          </span>
          <div className='labeled__detail'>
            <a
              href={`https://github.com/${repoName}/pull/${pull_request.number}`}
            >
              <span className='labeled__title'>{pull_request.title}</span>
            </a>
            <span className='labeled__number'>#{pull_request.number}</span>
            <p className='labeled__description'>{pull_request.body}</p>
            <div className='labeled__more-info'>
              <span className='labeled__addition'>
                +{pull_request.additions}
              </span>{" "}
              <span className='labeled__deletion'>
                -{pull_request.deletions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PullRequestEventItem;
