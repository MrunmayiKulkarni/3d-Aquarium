"use client";

import { useEffect, useState } from "react";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backgroundElements = document.getElementById("backgroundElements");
    if (!backgroundElements) return;

    backgroundElements.innerHTML = "";

    // Create bubbles
    for (let i = 0; i < 25; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      const size = Math.random() * 20 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animation = `float ${Math.random() * 3 + 2}s linear infinite`;
      backgroundElements.appendChild(bubble);
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
      
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl w-full max-w-lg shadow-2xl border border-white/20">
        <div className="text-center mb-6">
          <div className="text-6xl animate-bounce">🐠</div>
          <h1 className="text-white text-3xl font-extrabold">Join the Aquarium</h1>
          <p className="text-white/80">Dive in and explore the wonders of the ocean</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            required 
            className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center text-white text-sm">
            <input type="checkbox" id="terms" className="mr-2 w-4 h-4" required />
            <label htmlFor="terms">I agree to the <a href="#" className="underline hover:text-blue-300">Terms and Conditions</a></label>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-lg font-bold transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "🐠 Signing Up..." : "Create My Account"}
          </button>
        </form>

        <div className="text-center mt-5 text-white/80">
          <p>Already have an account? <a href="/login" className="underline hover:text-blue-300">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
