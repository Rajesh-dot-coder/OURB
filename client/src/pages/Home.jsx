import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>OURB — Buy & Sell Books</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in or sign up to start buying and selling books.</p>
      )}
    </div>
  );
};

export default Home;