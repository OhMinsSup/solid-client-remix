import React from "react";

const Draft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="0 0 384 512">
      <path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 39.2 28.2 71.8 65.5 78.7-.8 17.2-5 30.4-12.7 40-17.5 21.8-53.1 25.2-90.7 28.7-28.2 2.6-57.4 5.4-80.4 16.9-3.4 1.7-6.7 3.6-9.7 5.7V158.4c36.5-7.4 64-39.7 64-78.4 0-44.2-35.8-80-80-80S0 35.8 0 80c0 38.7 27.5 71 64 78.4v195.2C27.5 361 0 393.3 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-36.9-24.9-67.9-58.9-77.2 5-9.6 12.3-14.6 19-18 17.5-8.8 42.5-11.2 68.9-13.7 42.6-4 86.7-8.1 112.7-40.5 12.4-15.5 19-35.5 19.8-60.7C357.3 214 384 182.1 384 144zM32 80c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48zm96 352c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-26.4 21.4-47.9 47.8-48h.6c26.3.2 47.6 21.7 47.6 48zm187.8-241.5L304 192c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48c0 22.4-15.4 41.2-36.2 46.5z"></path>
    </svg>
  );
};

export default Draft;
