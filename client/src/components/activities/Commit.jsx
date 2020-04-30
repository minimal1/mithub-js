/** @format */

import React from "react";
import "./Commit.css";

function Commit({ commit, repoName }) {
  console.log(commit);
  const { userName, message, sha } = commit;
  return (
    <div className='push__commit commit'>
      <a href={`https://github.com/${userName}`}>
        <span className='commit__author-name'>{userName}</span>
      </a>

      <a href={`https://github.com/${repoName}/commit/${sha}`}>
        <span className='commit__sha'>{sha.slice(0, 7)}</span>
      </a>
      <span className='commit__message'>{message}</span>
    </div>
  );
}

export default Commit;
