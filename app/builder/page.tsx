"use client";

import { useState } from "react";
import Aquarium from "./aquarium";

const BuilderPage = () => {
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set());

  const items = {
    fishes: ["Goldfish", "Betta Fish", "Guppy"],
    plants: ["Water Lily", "Java Fern", "Amazon Sword"],
    corals: ["Brain Coral", "Bird's Nest Coral", "Mushroom Coral", "Star Polyps"]
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menu)) {
        newSet.delete(menu);
      } else {
        newSet.add(menu);
      }
      return newSet;
    });
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-950 p-4 shadow-lg">
        <h2 className="text-white text-xl font-bold mb-6">Aquarium Builder</h2>
        
        <div className="space-y-2">
          {/* Fishes Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('fishes')}
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center"
            >
              Fishes
              <span className={`transition-transform ${
                activeDropdowns.has('fishes') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('fishes') && (
              <div className="mt-1 bg-indigo-900/30 rounded-md overflow-hidden">
                {items.fishes.map((fish, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left"
                  >
                    {fish}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aquatic Plants Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('plants')}
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center"
            >
              Aquatic Plants
              <span className={`transition-transform ${
                activeDropdowns.has('plants') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('plants') && (
              <div className="mt-1 bg-indigo-900/30 rounded-md overflow-hidden">
                {items.plants.map((plant, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left"
                  >
                    {plant}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Corals Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('corals')}
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center"
            >
              Corals
              <span className={`transition-transform ${
                activeDropdowns.has('corals') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('corals') && (
              <div className="mt-1 bg-indigo-900/30 rounded-md overflow-hidden">
                {items.corals.map((coral, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left"
                  >
                    {coral}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center">
            Build Your Dream Aquarium
          </h1>
          <p className="mt-2 text-center text-white/90">
            Choose items from the sidebar to add to your aquarium
          </p>
        </div>
        
        {/* Aquarium container */}
        <div className="w-full h-[calc(100vh-12rem)] bg-slate-800 rounded-lg overflow-hidden">
          <Aquarium />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;