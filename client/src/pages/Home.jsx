import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CategoryChips from "../components/CategoryChips";
import BookCard from "../components/BookCard";
import API from "../api/axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <CategoryChips active={activeCategory} onSelect={setActiveCategory} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-navy text-xl font-bold mb-4">
          {activeCategory === "All" ? "Fresh Finds" : activeCategory}
        </h2>

        {loading ? (
          <p className="text-slate">Loading books...</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-slate">No books found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;