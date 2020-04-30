/** @format */

import React from "react";
import { observer, inject } from "mobx-react";
import "./MoreButton.css";

function MoreButton({ loading, isLast, onLoadMore }) {
  return (
    <button
      className={"more"}
      onClick={() => {
        if (!loading) onLoadMore();
      }}
      style={{ display: isLast ? "none" : "block" }}
    >
      {loading ? "Loading more..." : "More"}
    </button>
  );
}

export default inject(({ user }) => ({
  loading: user.userInfo.loading,
  isLast: user.userInfo.currentPage >= user.userInfo.lastPage,
  onLoadMore: user.loadNextPage,
}))(observer(MoreButton));
