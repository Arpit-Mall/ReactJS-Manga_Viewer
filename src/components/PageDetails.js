import React from "react";

const PageDetails = ({ currentPageIndex, totalPages }) => (
  <div className="page-details">
    {totalPages > 0 && (
      <span>
        {currentPageIndex + 1}/{totalPages}
      </span>
    )}
  </div>
);

export default PageDetails;
