import Image from 'next/image';


export default function Home() {
  return (
    <main>
      <div className="w-full">
        {/* <div className="p-5 w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white p-10 text-accent-content duration-200 h-fit"> */}
        <div className="p-5 w-full bg-gradient-to-b from-blue-900 to-blue-500 text-white duration-200 h-fit">

          <div className="flex flex-col justify-center items-center w-full max-w-[1280px] mx-auto gap-10 py-10">
            <div className="w-fit flex flex-col justify-center items-center">
              <h1 className="font-title font-bold text-6xl text-center max-w-[700px] max-sm:text-5xl mb-2">
                Dive into the World of 3D Aquariums!
              </h1>
              <p className="font-text max-w-[450px] text-center">
                Experience the beauty of underwater life like never before. Design, customize, and explore vibrant aquatic environments.
              </p>
              <div className="flex flex-row gap-4 mt-8">
                <button className="btn btn-primary">Start Building</button>
                <button className="btn">Explore Features</button>
              </div>
            </div>
            <div className="w-full">
              <img
                alt="3D Aquarium Hero Image"
                className="w-[75%] max-md:w-full mx-auto rounded-lg"
                src="https://wallup.net/wp-content/uploads/2018/10/08/661406-underwater-fish-fishes-ocean-sea-tropical-reef.jpg"
              />
            </div>
          </div>
        </div>
        <div className="p-5 w-full bg-neutral text-neutral-content duration-200 h-fit">
          <div className="flex flex-col max-w-[1280px] mx-auto items-center py-20">
            <h1 className="font-title text-4xl font-bold text-center mb-2 max-w-[500px]">
              Why Choose Our 3D Aquarium?
            </h1>
            <p className="font-text max-w-[450px] text-center">
              Create stunning underwater scenes that captivate and inspire.
            </p>
            <div className="mt-10 grid grid-cols-2 max-md:grid-cols-1 gap-5 w-full max-w-[1000px]">
              {/* <!-- Without 3D Aquarium Platform --> */}
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
              {/* <!-- With 3D Aquarium Platform --> */}
              <div className="bg-success/25 card p-10">
                <p className="text-lg font-bold mb-3 text-success font-title">
                  With Our 3D Aquarium Platform
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-success">✔</span>
                    <p className="text-success">Easily customize your aquarium in minutes.</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-success">✔</span>
                    <p className="text-success">Enjoy real-time design previews.</p>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span className="text-success">✔</span>
                    <p className="text-success">Access stunning pre-designed templates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
