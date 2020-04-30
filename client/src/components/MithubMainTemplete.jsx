/** @format */

import React from "react";
import "./MithubMainTemplete.css";

function MithubMainTemplete({ header, repositories, activities, more }) {
  return (
    <div className='mithub-main'>
      {header}
      <main>
        {/* <div className='mithub-main__repositories'>
          <h5>Repositories</h5>
          {repositories}
        </div> */}
        <div className='mithub-main__activities'>
          {/* <h5>All activity</h5> */}
          {activities}
          {more}
        </div>
      </main>
    </div>
  );
}

export default MithubMainTemplete;
