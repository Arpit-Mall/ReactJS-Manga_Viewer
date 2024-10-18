import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookSelector from "./components/BookSelector";
import ChapterSelector from "./components/ChapterSelector";
import ImageNavigator from "./components/ImageNavigator";
import PageDetails from "./components/PageDetails";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterImages, setChapterImages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const fetchChapterImages = useCallback(async (chapterId) => {
    try {
      const response = await axios.get(`http://52.195.171.228:8080/chapters/${chapterId}/`);
      setChapterImages(response.data.pages);
      setCurrentPageIndex(0);
    } catch (error) {
      console.error("Error fetching chapter images:", error);
    }
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://52.195.171.228:8080/books/");
      setBooks(response.data);
      if (response.data.length > 0) {
        const firstBook = response.data[0];
        setSelectedBook(firstBook);
        setSelectedChapter(firstBook.chapter_ids[0]);
        fetchChapterImages(firstBook.chapter_ids[0]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [fetchChapterImages]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    const firstChapterId = book.chapter_ids[0];
    setSelectedChapter(firstChapterId);
    fetchChapterImages(firstChapterId);
  };

  const handleChapterSelect = (chapterId) => {
    setSelectedChapter(chapterId);
    fetchChapterImages(chapterId);
  };

  const navigatePage = (direction) => {
    const totalChapters = selectedBook.chapter_ids.length;
    const currentChapterIndex = selectedBook.chapter_ids.indexOf(selectedChapter);

    if (direction === 'next') {
      if (currentPageIndex < chapterImages.length - 1) {
        setCurrentPageIndex((prevIndex) => prevIndex + 1);
      } else if (currentChapterIndex < totalChapters - 1) {
        handleChapterSelect(selectedBook.chapter_ids[currentChapterIndex + 1]);
      } else {
        handleBookSelect(books[(books.indexOf(selectedBook) + 1) % books.length]);
      }
    } else {
      if (currentPageIndex > 0) {
        setCurrentPageIndex((prevIndex) => prevIndex - 1);
      } else if (currentChapterIndex > 0) {
        handleChapterSelect(selectedBook.chapter_ids[currentChapterIndex - 1]);
      } else {
        handleBookSelect(books[(books.indexOf(selectedBook) - 1 + books.length) % books.length]);
      }
    }
  };

  return (
    <div className="App">
      <BookSelector books={books} onBookSelect={handleBookSelect} selectedBook={selectedBook} />

      {selectedBook && (
        <div className="book-display">
          <ChapterSelector
            chapterIds={selectedBook.chapter_ids}
            onChapterSelect={handleChapterSelect}
            selectedChapter={selectedChapter}
          />
          <ImageNavigator
            chapterImages={chapterImages}
            currentPageIndex={currentPageIndex}
            navigatePage={navigatePage}
          />
          <PageDetails currentPageIndex={currentPageIndex} totalPages={chapterImages.length} />
        </div>
      )}
    </div>
  );
}

export default App;
