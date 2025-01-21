'use client';

import { useState } from 'react';

export default function BuilderPage() {
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set());

  const items = {
    fishes: ['Goldfish', 'Betta Fish', 'Guppy'],
    plants: ['Water Lily', 'Java Fern', 'Amazon Sword'],
    corals: ['Brain Coral', 'Bird\'s Nest Coral', 'Mushroom Coral', 'Star Polyps']
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdowns(prev => {
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
    <main className="flex">
      {/* Sidebar with dropdowns */}
      <div className="w-64 bg-gradient-to-b from-indigo-950 to-slate-900 min-h-screen p-4 shadow-lg relative overflow-hidden">
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`
             }}>
        </div>
        <div className="space-y-2 relative">
          {/* Fishes Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('fishes')}
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center backdrop-blur-sm transition-colors"
            >
              Fishes
              <span className={`transition-transform ${
                activeDropdowns.has('fishes') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('fishes') && (
              <div className="mt-1 bg-indigo-900/30 backdrop-blur-sm rounded-md overflow-hidden">
                {items.fishes.map((fish, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left transition-colors"
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
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center backdrop-blur-sm transition-colors"
            >
              Aquatic Plants
              <span className={`transition-transform ${
                activeDropdowns.has('plants') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('plants') && (
              <div className="mt-1 bg-indigo-900/30 backdrop-blur-sm rounded-md overflow-hidden">
                {items.plants.map((plant, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left transition-colors"
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
              className="w-full px-4 py-2 bg-indigo-900/50 hover:bg-indigo-800/50 rounded-md text-white text-left flex justify-between items-center backdrop-blur-sm transition-colors"
            >
              Corals
              <span className={`transition-transform ${
                activeDropdowns.has('corals') ? 'rotate-180' : ''
              }`}>▼</span>
            </button>
            {activeDropdowns.has('corals') && (
              <div className="mt-1 bg-indigo-900/30 backdrop-blur-sm rounded-md overflow-hidden">
                {items.corals.map((coral, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 text-white hover:bg-indigo-700/50 text-left transition-colors"
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
      <div className="flex-1 relative">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        
        {/* Wavy pattern overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 20px'
             }}>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-600/30 to-blue-900/30"></div>

        {/* Content */}
        <div className="relative w-full p-10 min-h-screen">
          <div className="flex flex-col justify-center items-center w-full max-w-[1280px] mx-auto gap-10 py-10">
            <h1 className="font-title text-5xl font-bold text-center text-white">
              Build Your Dream 3D Aquarium
            </h1>
            <p className="font-text max-w-[600px] text-center text-white/90">
              Use our intuitive tools to design your perfect underwater environment. Choose from various aquatic life, decorations, and themes.
            </p>
            <div className="w-full backdrop-blur-sm bg-white/10 rounded-2xl p-6 shadow-xl">
              <img
                alt="Builder Workspace"
                className="w-[75%] max-md:w-full mx-auto rounded-lg shadow-lg"
                src="https://your-image-link.com/aquarium-workspace.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}