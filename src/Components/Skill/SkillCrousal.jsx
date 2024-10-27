import { useState } from "react";


import Marquee from "react-fast-marquee";
import ReactSkill from "../SkillButtons/ReactSkill";
import NodeSkill from "../SkillButtons/NodeSkill";
import PythonSkill from "../SkillButtons/PythonSkill";

const SkillCrousal = (props) => {
 

  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  return (
    <div className="recruiter-logo">
      <Marquee
        autoFill={true}
        direction={props.direction}
        pauseOnHover={true}
        speed={props.speed}
      >
        <ReactSkill/>
        <NodeSkill/>
        <PythonSkill/>
        {/* {showRow.map((logo, index) => (
          <img
            width="130px"
            key={index}
            className="logo max-h-[120px] max-w-[150px]"
            style={{
              filter:
                hoveredImageIndex === index ? "grayscale(0)" : "grayscale(1)",
              transform:
                hoveredImageIndex === index ? "scale(1)" : "scale(0.85)",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            src={logo}
            alt={"Logo " + index}
          />
        ))} */}
      </Marquee>
    </div>
  );
};

export default SkillCrousal;
