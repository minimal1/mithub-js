/** @format */
import React, { useState } from "react";
import "./RepoInfo.css";
import Axios from "axios";

function RepoInfo({ repoName, repoUrl, accessToken }) {
  const [language, setLanguage] = useState("");
  const [stars, setStars] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  Axios.get(repoUrl, {
    header: { Authorization: `token ${accessToken}` },
  }).then((res) => {
    console.log(res);
    setLanguage(res.data.language);
    setStars(res.data.stargazers_count);
    if (res.data.updated_at) {
      setDate(res.data.updated_at);
    } else {
      setDate(res.data.created_at);
    }
    setDescription(res.data.description);
  });

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
          <span className='repo__language'>{language}</span>
          <span className='repo__stars'>{stars}</span>
          <span className='repo__date'>{date}</span>
        </div>
      </div>
      <button className='event__button'>
        <i className='fas fa-star'></i> Star
      </button>
    </div>
  );
}

export default RepoInfo;
