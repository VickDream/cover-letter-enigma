import React from 'react';
import '../styles/LightOpBackground.css';

const LightWavesBackground = () => {
  return (
    <div className="light-waves-bg">
      {/* Base estática abajo */}
      <div className="static-glow-bottom"></div>

      {/* Faros dinámicos arriba (barrido suave) */}
      <div className="lighthouse-beam-left"></div>
      <div className="lighthouse-beam-right"></div>

      {/* Brillo ambiental general */}
      <div className="ambient-glow"></div>
    </div>
  );
};

export default LightWavesBackground;