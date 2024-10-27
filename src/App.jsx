import "./App.css";
import LaptopExport from "./Components/3-D Component/LaptopExport";
import ProfileV1 from "./Components/3D-Profile-Card/3D-Profile";
import Profile from "./Components/3D-Profile-Card/Profile";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import Intro from "./Components/Front/Intro";
import Roller from "./Components/Roller/Roller";
import SkillCrousal from "./Components/Skill/SkillCrousal";
import Terminal from "./Components/Terminal/Terminal";
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
      <div className="text-bold font-sans text-[3em] text-center ">
        Work Experience
        <div className="px-auto  flex justify-around">
          <div className="flex flex-wrap">
            <div className="aspect-square mr-4 overflow-hidden ">
              <ErrorBoundary>
                <LaptopExport />
              </ErrorBoundary>
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
      <div className="text-bold font-sans text-[3em] text-center ">
        Projects
        <div className="px-auto  flex justify-around">
          <div className="flex flex-wrap">
            <div className="aspect-square mr-4 overflow-hidden ">
              <Roller Src="/project-1.jpg" />
            </div>
            <div>
              <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
                <div className="mt-4 text-lg">
                  <p className="text-green-400 text-3xl">BlinkKart Project</p>{" "}
                  <span className="font-bold">Sep. 2023 - Dec. 2023</span>
                  <ul className="text-white list-disc ml-4">
                    <li>
                      Implemented sound navigation throughout the website.
                    </li>
                    <li>
                      Created an interactive keyboard that produces sound on
                      every key press.
                    </li>
                    <li>Deployed the website on AWS S3 Bucket.</li>
                  </ul>
                  <div className="mt-4">
                    <a
                      href="http://blind-kart2.s3-website.ap-south-1.amazonaws.com/"
                      className="text-blue-400 underline"
                    >
                      Live Demo
                    </a>{" "}
                    |{" "}
                    <a
                      href="https://github.com/AyushIIITU/BlindKart-Page"
                      className="text-blue-400 underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="px-auto  flex justify-around ">
          <div className="flex flex-wrap flex-row-reverse">
            <div className="aspect-square mr-4 overflow-hidden ">
              <Roller Src="/project-2.jpg" />
            </div>
            <div>
              <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
                <div className="mt-4 text-lg">
                  <p className="text-green-400 text-3xl">
                    Campus Management System
                  </p>{" "}
                  <span className="font-bold">Jan. 2023 - Apr. 2024</span>
                  {/* <p className="animate-typing overflow-hidden whitespace-nowrap text-xl text-white font-bold">
                React.js, Node.js, MongoDB, Express.js, Bootstrap
              </p> */}
                  <ul className="text-white list-disc ml-4">
                    <li>
                      Developed a full-fledged management website using the MERN
                      stack for a robust and scalable web application.
                    </li>
                    <li>
                      Built a secure and efficient backend with Node.js and
                      Express.js, ensuring data integrity.
                    </li>
                    <li>
                      Implemented a responsive UI leveraging React.js and
                      Bootstrap.
                    </li>
                    <li>
                      Used data structures like queues and stacks to manage the
                      laundry system efficiently, reducing congestion.
                    </li>
                  </ul>
                  <div className="mt-4">
                    <a href="#" className="text-blue-400 underline">
                      Demo
                    </a>{" "}
                    |{" "}
                    <a
                      href="https://github.com/AyushIIITU/Campus-Management-System"
                      className="text-blue-400 underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
<SkillCrousal  direction="right" speed="55"/>

<Terminal/>

      {/* <LaptopExport /> */}
    </>
  );
}

export default App;
