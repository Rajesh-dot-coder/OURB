const categories = ["All", "Fiction", "Non-Fiction", "Academic", "Self-help", "Comics", "Children's"];

const CategoryChips = ({ active, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 px-4 max-w-7xl mx-auto scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
            active === cat
              ? "bg-navy text-white"
              : "bg-white text-slate border border-border hover:border-navy"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;