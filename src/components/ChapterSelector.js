import React from "react";

const ChapterSelector = ({ chapterIds, onChapterSelect, selectedChapter }) => (
  <div className="chapter-buttons">
    {chapterIds.map((chapterId, index) => (
      <button
        key={chapterId}
        onClick={() => onChapterSelect(chapterId)}
        className={selectedChapter === chapterId ? "chapter-btn active" : "chapter-btn"}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default ChapterSelector;
