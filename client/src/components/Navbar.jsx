import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-amber text-2xl font-extrabold tracking-tight shrink-0">
          OURB
        </Link>

        <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for books, authors, genres..."
            className="flex-1 px-4 py-2 outline-none text-slate text-sm"
          />
          <button className="bg-amber px-5 py-2 text-navy font-semibold text-sm hover:bg-amber/90 transition">
            Search
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <button
                onClick={() => navigate("/add-book")}
                className="bg-amber text-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-amber/90 transition"
              >
                + Sell a Book
              </button>
              <span className="text-white text-sm hidden sm:block">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-white text-sm border border-white/30 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-sm px-3 py-2 hover:text-amber transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-amber text-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-amber/90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;