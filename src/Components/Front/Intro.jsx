// import React, { useState, useEffect } from 'react';
// import './App.css'; // Make sure to create this CSS file with the styles below
import style from "./Intro.module.css"
const Intro = () => {
  // const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // const words = ['developer', 'programmer', 'Problem Solver'];


  return (
   /* From Uiverse.io by kennyotsu */ 
<div className={style["card"]}>
  <div className={style["loader"]}>
    <div className="text-wrap">  I am a </div>
    <div className={style["words"]}>
      <span className={style["word"]}>Devloper</span>
      <span className={style["word"]}>Programmer</span>
      <span className={style["word"]}>Problem Solver</span>
      <span className={style["word"]}>Software Engineer</span>
      <span className={style["word"]}>Devloper</span>
    </div>
  </div>
</div>

  );
};

export default Intro;
