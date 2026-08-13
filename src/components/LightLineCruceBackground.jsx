import React from 'react';
import '../styles/LightWavesBackground.css';

const LightWavesBackground = () => {
  return (
    <div className="light-waves-bg">
      <svg
        className="svg-beams-fx"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradiente estrecho para el Haz 1 (Cian / Magenta más concentrado) */}
          <linearGradient id="laserBeam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="42%" stopColor="transparent" />
            <stop offset="48%" stopColor="#0099ff" stopOpacity="0.3" />
            <stop offset="52%" stopColor="#e6007e" stopOpacity="0.35" />
            <stop offset="58%" stopColor="transparent" />
          </linearGradient>

          {/* Gradiente estrecho para el Haz 2 (Amarillo / Azul más fino) */}
          <linearGradient id="laserBeam2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="44%" stopColor="transparent" />
            <stop offset="49%" stopColor="#ffcc00" stopOpacity="0.2" />
            <stop offset="53%" stopColor="#0099ff" stopOpacity="0.25" />
            <stop offset="58%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Haces finos en diagonal */}
        <g className="beam-group-1">
          <rect
            x="-400"
            y="-400"
            width="2600"
            height="2600"
            fill="url(#laserBeam1)"
            transform="rotate(25 960 540)"
          />
        </g>

        <g className="beam-group-2">
          <rect
            x="-400"
            y="-400"
            width="2600"
            height="2600"
            fill="url(#laserBeam2)"
            transform="rotate(-20 960 540)"
          />
        </g>
      </svg>
    </div>
  );
};

export default LightWavesBackground;