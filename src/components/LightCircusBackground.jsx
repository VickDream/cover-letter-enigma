import React from 'react';
import '../styles/LightWavesBackground.css';

const LightWavesBackground = () => {
  return (
    <div className="light-waves-bg">
      <svg
        className="svg-background-fx"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#030206" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="magentaGlow" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e6007e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#030206" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="yellowGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#030206" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Formas vectoriales animadas dentro del SVG */}
        <g className="svg-group-1">
          <circle cx="200" cy="200" r="450" fill="url(#cyanGlow)" />
        </g>
        <g className="svg-group-2">
          <circle cx="1200" cy="700" r="500" fill="url(#magentaGlow)" />
        </g>
        <g className="svg-group-3">
          <circle cx="720" cy="450" r="350" fill="url(#yellowGlow)" />
        </g>
      </svg>
    </div>
  );
};

export default LightWavesBackground;