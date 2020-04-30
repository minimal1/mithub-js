/** @format */
import React from "react";
import "./RepoInfo.css";

function RepoInfo({ repoName, repoUrl }) {
  const description = "Description & Requirements Reference";
  return (
    <div className='event__detail repo'>
      <div className='repo__detail'>
        <a href={`https://github.com/${repoName}`}>
          <span className='repo__title'>{repoName}</span>
        </a>
        <div className='repo__description'>
          <p>{description}</p>
        </div>
        <div className='repo__more-info'>
          <span className='repo__language'></span>
          <span className='repo__stars'></span>
          <span className='repo__issues'></span>
          <span className='repo__date'></span>
        </div>
      </div>
      <button className='event__button'>
        <i className='fas fa-star'></i> Star
      </button>
    </div>
  );
}

export default RepoInfo;
