import React from 'react';
import LightOpBackground from './components/LightOpBackground';
import Card3D from './components/Card3D';

// web de referencia  https://enigmapublicidadydiseno.pages.dev/

import './App.css';

function App() {
  return (
    <>
      <LightOpBackground />
      <main className="container">
        {/* Fondo animado optimizado y aislado */}
        {/* Luna SVG desde la carpeta public */}
        <div className="bg-moon-wrapper">
          <img
            src="/logoe.svg"
            alt="Logo E"
            className="moon-svg"
          />
        </div>

        {/* Encabezado Místico */}
        {/*<header className="header">
          <div className="logo-container">
            <img src="/logo.svg" alt="Logo Enigma" className='img-svg'/>
          </div>
        </header>*/}

        {/* Carta 3D Modular Interactiva con Tilt Parallax */}
        <Card3D />
      </main>
    </>
  );
}

export default App;