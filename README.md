# Book Reader Hub

A user-friendly static website for book readers. Search a title and browse:

- Book metadata from Open Library and Google Books
- Preview / free ebook availability links
- Retailer search links for Amazon, eBay, Book Depository, Google Books, and Open Library
- Offline sample mode when live API access is unavailable

## How to use

1. Open `index.html` in your browser.
2. Enter a book title or author.
3. Pick a result from the left-hand list.
4. View book details, preview options, and retailer links.

> Tip: For best results, open the site with a local HTTP server or use the VS Code Live Server extension.

## Files

- `index.html` — main web page
- `styles.css` — styling
- `script.js` — search logic and API integration

## APIs Used

This application integrates multiple APIs to provide comprehensive book information:

### 1. Open Library API (Primary Source)
- **Search API**: `https://openlibrary.org/search.json?q={query}`
  - Used for searching books by title, author, or subject
  - Returns book metadata including title, authors, publishers, ISBN, cover IDs, and more
  
- **Book Details API**: `https://openlibrary.org/{key}.json`
  - Fetches detailed book descriptions from Open Library work records
  
- **Book Covers API**: `https://covers.openlibrary.org/b/id/{id}-L.jpg`
  - Retrieves book cover images using cover ID or ISBN

### 2. Google Books API (Secondary Source)
- **Volumes API**: `https://www.googleapis.com/books/v1/volumes?q={query}`
  - Used as primary source for book descriptions
  - Provides fallback cover images when Open Library covers are unavailable
  - Returns additional metadata like ratings, page count, and categories
  
- **Cover Images**: `https://books.google.com/books/content?id={id}&printsec=frontcover`
  - High-quality book cover images from Google Books

### 3. Wikipedia API (Fallback)
- **REST API**: `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
  - Used as fallback for book descriptions when other sources don't have sufficient content
  - Provides brief extracts/summaries about books

### 4. Browser APIs
- **LocalStorage API**: For persisting user data (favorites, settings, ratings, notifications)
- **Fetch API**: For all HTTP requests to external APIs
- **DOM API**: For UI manipulation and rendering

## Description Fetching Priority

The application fetches book descriptions in the following order:
1. **Google Books API** (Primary - best descriptions)
2. **Open Library API** (Secondary)
3. **Wikipedia API** (Fallback)
4. **First Sentence** (Last resort from book data)

## Cover Image Priority

Cover images are loaded in the following order:
1. **Open Library** (by cover ID)
2. **Open Library** (by ISBN)
3. **Google Books** (by book ID)
4. **Google Books** (thumbnail fallback)