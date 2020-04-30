/** @format */
import React from "react";
import "./LabeledEventItem.css";

function IssueEventItem({ item }) {
  const { username, avatarUrl, repoName, createdAt, issue } = item;

  return (
    <div className='event item-issue'>
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
          labeled an issue with{" "}
          <span
            className='event__label'
            style={{ backgroundColor: `#${issue.color}` }}
          >
            {issue.label}
          </span>{" "}
          in{" "}
          <a href={`https://github.com/${repoName}`}>
            <span className='event__repo'>{repoName}</span>
          </a>
          <span className='event__timestamp'>{createdAt}</span>
        </div>
        <div className='event__detail labeled'>
          <span className='labeled__icon'>
            <i className='fas fa-exclamation'></i>
          </span>
          <div className='labeled__detail'>
            <a href={`https://github.com/${repoName}/issues/${issue.number}`}>
              <span className='labeled__title'>{issue.title}</span>
            </a>
            <span className='labeled__number'>#{issue.number}</span>
            <p className='labeled__description'>{issue.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueEventItem;
