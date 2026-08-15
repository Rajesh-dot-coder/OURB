import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

    return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl border border-border">
        <h2 className="text-navy text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border border-border rounded-lg px-4 py-2 mb-3 outline-none focus:border-navy transition"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-border rounded-lg px-4 py-2 mb-3 outline-none focus:border-navy transition"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button 
        type="submit"
        className="w-full bg-amber text-navy font-semibold py-2 rounded-lg hover:bg-amber/90 transition"
        >Login</button>
      </form>
        <p className="text-slate text-sm mt-4">
          Don't have an account? <Link to="/login" className="text-navy font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;