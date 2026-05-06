"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type BookmarksContextType = {
  bookmarks: string[]; // array of post slugs
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    const next = bookmarks.includes(slug)
      ? bookmarks.filter((s) => s !== slug)
      : [...bookmarks, slug];
    
    setBookmarks(next);
    localStorage.setItem("bookmarks", JSON.stringify(next));
  };

  const isBookmarked = (slug: string) => bookmarks.includes(slug);

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
