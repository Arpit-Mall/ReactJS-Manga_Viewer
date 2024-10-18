import React from "react";

const ImageNavigator = ({ chapterImages, currentPageIndex, navigatePage }) => (
  <div className="chapter-images">
    {chapterImages.length > 0 && (
      <div className="image-container">
        <img
          src={chapterImages[currentPageIndex]?.image.file}
          alt={`Page ${currentPageIndex + 1}`}
          className="chapter-image"
        />
        <div
          className="image-navigation left"
          onClick={(e) => {
            e.stopPropagation();
            navigatePage('previous');
          }}
        />
        <div
          className="image-navigation right"
          onClick={(e) => {
            e.stopPropagation();
            navigatePage('next');
          }}
        />
      </div>
    )}
  </div>
);

export default ImageNavigator;
