'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 bg-blue-900 text-white shadow-lg z-50">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-5 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="font-title font-bold text-2xl">3D Aquarium</h1>
          </div>

          {/* User Options */}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="btn bg-transparent border border-white text-white hover:bg-white hover:text-blue-900"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="btn bg-white text-blue-900 hover:bg-blue-700 hover:text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full mt-[80px]">
        <div className="relative p-5 w-full min-h-[90vh] text-white duration-200 overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-800"></div>

          {/* Animated overlay pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 20px',
            }}
          ></div>

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>

          {/* Content */}
          <div className="relative flex flex-col justify-center items-center w-full max-w-[1280px] mx-auto gap-10 py-10">
            <div className="w-fit flex flex-col justify-center items-center backdrop-blur-sm bg-white/5 p-8 rounded-2xl">
              <h1 className="font-title font-bold text-6xl text-center max-w-[700px] max-sm:text-5xl mb-2">
                Dive into the World of 3D Aquariums!
              </h1>
              <p className="font-text max-w-[450px] text-center text-blue-50">
                Experience the beauty of underwater life like never before. Design, customize, and explore vibrant aquatic environments.
              </p>
              <div className="flex flex-row gap-4 mt-8">
                <Link
                  href="/builder"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
                >
                  Start Building
                </Link>
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-[75%] max-md:w-full mx-auto rounded-lg overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <img
                  alt="3D Aquarium Hero Image"
                  className="w-full"
                  src="https://wallup.net/wp-content/uploads/2018/10/08/661406-underwater-fish-fishes-ocean-sea-tropical-reef.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-5 w-full bg-neutral text-neutral-content duration-200 h-fit">
        <div className="flex flex-col max-w-[1280px] mx-auto items-center py-20">
          <h1 className="font-title text-4xl font-bold text-center mb-2 max-w-[500px]">
            Why Choose Our 3D Aquarium?
          </h1>
          <p className="font-text max-w-[450px] text-center">
            Create stunning underwater scenes that captivate and inspire.
          </p>
          <div className="mt-10 grid grid-cols-2 max-md:grid-cols-1 gap-5 w-full max-w-[1000px]">
            <div className="bg-error/25 card p-10">
              <p className="text-lg font-bold mb-3 text-error font-title">
                Without a 3D Aquarium Platform
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-error">✖</span>
                  <p className="text-error">Limited options for customization.</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-error">✖</span>
                  <p className="text-error">Takes hours to create realistic designs.</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-error">✖</span>
                  <p className="text-error">No real-time updates or previews.</p>
                </div>
              </div>
            </div>
            <div className="bg-success/25 card p-10">
              <p className="text-lg font-bold mb-3 text-success font-title">
                With Our 3D Aquarium Platform
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-success">✔</span>
                  <p className="text-success">
                    Easily customize your aquarium in minutes.
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-success">✔</span>
                  <p className="text-success">Enjoy real-time design previews.</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="text-success">✔</span>
                  <p className="text-success">
                    Access stunning pre-designed templates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
