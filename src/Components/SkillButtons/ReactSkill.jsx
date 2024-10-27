import React from 'react'
import style from './skillButton.module.css'
function ReactSkill() {
  return (
   /* From Uiverse.io by Smit-Prajapati */ 
<button className={style["button"]}>
  <div className={style["bloom-container"]}>
    <div className={style["button-container-main"]}>
      <div className={style["button-inner"]}>
        <div className={style["back"]}></div>
        <div className={style["front"]}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"   className={style["svg"]}>
  <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
  <g stroke="#61dafb" strokeWidth="1" fill="none">
    <ellipse rx="11" ry="4.2"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </g>
</svg>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
          
            viewBox="0 0 512 512"
          >
            <path
              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
            ></path>
          </svg> */}
        </div>
      </div>
      <div className={style["button-glass"]}>
        <div className={style["back"]}></div>
        <div className={style["front"]}></div>
      </div>
    </div>
    <div className={style["bloom bloom1"]}></div>
    <div className={style["bloom bloom2"]}></div>
  </div>
</button>

  )
}

export default ReactSkill