import "./App.css";
import LaptopExport from "./Components/3-D Component/LaptopExport";
import ProfileV1 from "./Components/3D-Profile-Card/3D-Profile";
import Profile from "./Components/3D-Profile-Card/Profile";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import Intro from "./Components/Front/Intro";
import Roller from "./Components/Roller/Roller";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Profile />
      </div>
      {/* <div className="flex">
        <Intro />
        <div className="w-1/2 h-screen">
          <ProfileV1 />
        </div>
      </div> */}
      <div className="text-bold font-sans text-[3em] w-screen text-center ">
        Work Experience
        <div className="px-auto w-screen flex justify-around">
          <div className="flex flex-wrap">
            <div className="aspect-square mr-4 overflow-visible ">
              <ErrorBoundary
              >
              <LaptopExport /></ErrorBoundary>
            </div>
            <div>
              <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
                <div className="mt-4 text-lg">
                  <p className="text-green-400 text-3xl">Backend Lead</p>{" "}
                  <span className="font-bold">Apr. 2024 - Present</span>
                  <p className="animate-typing overflow-hidden whitespace-nowrap text-xl text-white font-bold">
                    Indian Institute of Information Technology Una
                  </p>
                  {/* <p className="text-white">React.js, Node.js, MongoDB, Express.js, Tailwind CSS</p> */}
                  <ul className="text-white list-disc ml-4">
                    <li>
                      Developed the official website of IIIT Una as the primary
                      developer.
                    </li>
                    <li>
                      Implemented the backend for server-side logic and database
                      interactions.
                    </li>
                    <li>
                      Optimized image loading, reduce vernability and enhance
                      security throut the website
                    </li>
                    <li>
                      Led the backend team, ensuring timely project completion
                      and maintaining code quality.
                    </li>
                    <li>
                      Crate Faculty and Admin Panel for seamless data
                      intrgartion
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* <LaptopExport /> */}
      <Roller />
    </>
  );
}

export default App;
