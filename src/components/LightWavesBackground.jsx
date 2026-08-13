import React from 'react';
import '../styles/LightWavesBackground.css';

const LightWavesBackground = () => {
  return (
    <div className="light-waves-bg">
      {/* Usamos un SVG estático, el navegador lo renderiza una vez y listo */}
      <svg className="svg-beams-fx" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <defs>
          <linearGradient id="laserBeam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="42%" stopColor="transparent" />
            <stop offset="48%" stopColor="#0099ff" stopOpacity="0.25" />
            <stop offset="52%" stopColor="#e6007e" stopOpacity="0.3" />
            <stop offset="58%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="laserBeam2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="44%" stopColor="transparent" />
            <stop offset="49%" stopColor="#ffcc00" stopOpacity="0.15" />
            <stop offset="53%" stopColor="#0099ff" stopOpacity="0.2" />
            <stop offset="58%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#laserBeam1)" transform="rotate(25 960 540)" />
        <rect width="100%" height="100%" fill="url(#laserBeam2)" transform="rotate(-20 960 540)" />
      </svg>
      {/* Una capa de brillo extra que es la que se mueve levemente */}
      <div className="ambient-glow"></div>
    </div>
  );
};

export default LightWavesBackground;