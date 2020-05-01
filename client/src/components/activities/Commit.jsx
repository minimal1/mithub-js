/** @format */

import React from "react";
import "./Commit.css";
import Axios from "../../../../server/node_modules/axios";

function Commit({ commit, repoName }) {
  console.log(commit);
  let { userName, message, sha } = commit;

  return (
    <div className='push__commit commit'>
      <span className='commit__author-name'>{userName}</span>

      <a href={`https://github.com/${repoName}/commit/${sha}`}>
        <span className='commit__sha'>{sha.slice(0, 7)}</span>
      </a>
      <span className='commit__message'>{message}</span>
    </div>
  );
}

export default Commit;
