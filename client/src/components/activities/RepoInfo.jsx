/** @format */
import React, { useState } from "react";
import "./RepoInfo.css";
import Axios from "axios";
import { getTimestamp } from "../../utils/uilts";

function RepoInfo({ repoName, repoUrl, accessToken }) {
  const [language, setLanguage] = useState("");
  const [stars, setStars] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [starred, setStarred] = useState(false);

  Axios.get(repoUrl, {
    headers: { Authorization: `token ${accessToken}` },
  }).then((res) => {
    console.log(res);
    setLanguage(res.data.language);
    setStars(res.data.stargazers_count);
    setDescription(res.data.description);

    const timestamp = new Date(res.data.updated_at);
    setDate(getTimestamp(timestamp));
  });

  const checkStar = () =>
    Axios.get(`https://api.github.com/user/starred/${repoName}`, {
      headers: { Authorization: `token ${accessToken}` },
    })
      .then((res) => {
        if (res.status === 204) setStarred(true);
        else setStarred(false);
      })
      .catch((error) => console.log(error));

  const starRepo = () => {
    starred
      ? Axios.delete(`https://api.github.com/user/starred/${repoName}`, {
          headers: {
            Authorization: `token ${accessToken}`,
            "Content-Length": "0",
          },
        })
          .then((res) => {
            checkStar();
          })
          .catch((error) => console.log(error))
      : Axios.put(`https://api.github.com/user/starred/${repoName}`, null, {
          headers: {
            Authorization: `token ${accessToken}`,
            "Content-Length": "0",
          },
        })
          .then((res) => {
            checkStar();
          })
          .catch((error) => console.log(error));
  };

  checkStar();
  return (
    <div className='event__detail repo'>
      <div className='repo__detail'>
        <a href={`https://github.com/${repoName}`}>
          <span className='repo__title'>{repoName}</span>
        </a>
        <div className='repo__description'>
          <p>{description}</p>
        </div>
        <ul className='repo__more-info'>
          {language !== "" ? (
            <li className='repo__language info'>{language}</li>
          ) : (
            <></>
          )}
          {stars > 0 ? (
            <li className='repo__stars info'>
              <a href={`https://github.com/${repoName}/stargazers`}>
                <i className='fas fa-star'></i>
                {stars}
              </a>
            </li>
          ) : (
            <></>
          )}
          {date !== "" ? (
            <li className='repo__date info'>Updated {date}</li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <button className='event__button' onClick={starRepo}>
        <i className='fas fa-star'></i> {starred ? "Unstar" : "Star"}
      </button>
    </div>
  );
}

export default RepoInfo;
