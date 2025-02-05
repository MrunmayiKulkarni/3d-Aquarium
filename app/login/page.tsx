"use client";

import { useEffect, useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backgroundElements = document.getElementById("backgroundElements");
    if (!backgroundElements) return;

    backgroundElements.innerHTML = "";

    // Create bubbles
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      const size = Math.random() * 20 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
      backgroundElements.appendChild(bubble);
    }

    // Fish types
    const fishTypes = ["🐠", "🐡", "🐟", "🎏", "🦈", "🐋", "🐳", "🦑"];

    for (let i = 0; i < 12; i++) {
      const fish = document.createElement("div");
      fish.className = "fish";
      fish.textContent = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      fish.style.top = `${Math.random() * 70 + 10}%`;
      fish.style.animation = `swimHorizontal ${Math.random() * 8 + 5}s linear infinite`;
      backgroundElements.appendChild(fish);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-400 overflow-hidden">
      <div id="backgroundElements" className="absolute inset-0 pointer-events-none"></div>
      
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl animate-bounce">🐠</div>
          <h1 className="text-white text-2xl font-bold">Log In</h1>
          <p className="text-white/80">Explore the Aquarium</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full p-3 bg-white/20 border border-white/30 rounded text-white focus:outline-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full p-3 bg-white/20 border border-white/30 rounded text-white focus:outline-none"
          />
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            disabled={loading}
          >
            {loading ? "🐠 Loading..." : "Log In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-white/80 hover:text-white">Forgot your password?</a>
          <br />
          <a href="/signup" className="text-white/80 hover:text-white">New visitor? Create account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;