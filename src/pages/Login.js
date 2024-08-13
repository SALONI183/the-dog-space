import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    // Simulate successful login
    setIsLoggedIn(true);
    setError("");

    // Navigate to the home page after successfull  login.
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20210327/pngtree-cute-dog-tiling-background-blue-claw-claw-image_595784.jpg')]">
      {!isLoggedIn ? (
        <div className="bg-white p-8 rounded shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 block w-full border rounded bg-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 block w-full border rounded bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold">Welcome, {name}!</h2>
          <p className="mt-4">You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
}
