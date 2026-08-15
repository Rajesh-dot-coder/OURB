import { Link } from "react-router-dom";

const conditionColors = {
  New: "bg-success/10 text-success",
  "Like New": "bg-success/10 text-success",
  Good: "bg-amber/20 text-navy",
  Fair: "bg-slate/10 text-slate",
  Poor: "bg-red-100 text-red-600",
};

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/books/${book._id}`}
      className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="aspect-[3/4] bg-cream overflow-hidden">
        {book.imageUrl ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate/40 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-navy font-bold text-lg">₹{book.price}</p>
        <h3 className="text-slate text-sm font-medium truncate mt-1">{book.title}</h3>
        <p className="text-slate/70 text-xs truncate">{book.author}</p>
        <span
          className={`inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            conditionColors[book.condition] || "bg-slate/10 text-slate"
          }`}
        >
          {book.condition}
        </span>
      </div>
    </Link>
  );
};

export default BookCard;