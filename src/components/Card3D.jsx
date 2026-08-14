import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  SiInstagram,
  SiFacebook,
  SiWhatsapp,
  SiGooglemaps
} from 'react-icons/si';
import { FaRocket } from 'react-icons/fa';
import '../styles/Card3D.css';

export default function Card3D() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Efecto Tilt / Parallax 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rango ampliado ([22, -22] y [-22, 22]) para que se incline un poco más
  const rotateXQuantity = useTransform(mouseY, [-260, 260], [22, -22]);
  const rotateYQuantity = useTransform(mouseX, [-160, 160], [-22, 22]);

  const tiltX = useSpring(rotateXQuantity, { stiffness: 300, damping: 30 });
  const tiltY = useSpring(rotateYQuantity, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Soporte de giroscopio para móviles
  useEffect(() => {
    const handleOrientation = (e) => {
      let beta = e.beta;   // Inclinación adelante/atrás (-180 a 180)
      let gamma = e.gamma; // Inclinación izquierda/derecha (-90 a 90)

      if (beta === null || gamma === null) return;

      // Limitamos y escalamos los valores para mover los MotionValues de Framer Motion
      beta = Math.max(-45, Math.min(45, beta));
      gamma = Math.max(-45, Math.min(45, gamma));

      mouseX.set(gamma * 4);
      mouseY.set(beta * 4);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="card-scene"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="card"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, cubicBezier: [0.4, 0.2, 0.2, 1] }}
      >
        {/* CARA FRONTAL */}
        <div className="card-face card-front">
          <div className="card-border">
            <div className="corner-symbol top-left">+</div>
            <div className="corner-symbol top-right">+</div>

            <div className="cover-wrapper">
              <img src="logoe.webp" alt="img enigma" className="album-cover" />
            </div>

            {/* <div className="card-colaborations">
              <h2>Moisés Ávila</h2>
              <h2>Virginia Gaytan</h2>
              <h2>Victor Mosqueda</h2>
            </div> */}

            <div className="card-info">
              <h2>Enigma</h2>
              <p>Publicidad y Diseño</p>
              <span className="flip-hint">Girar ↺</span>
              <div className="corner-symbol bottom-left">+</div>
              <div className="corner-symbol bottom-right">+</div>
            </div>
          </div>
        </div>

        {/* CARA TRASERA */}
        <div className="card-face card-back">
          <div className="card-border">
            <h3 className="links-title">Redes Sociales</h3>

            <div className="links-list">
              <a href="https://www.instagram.com/enigma_soluciones_graficas/" target="_blank" rel="noopener noreferrer" className="arcana-btn" onClick={(e) => e.stopPropagation()}>
                <SiInstagram className="icon" /> Instagram
              </a>

              <a href="https://www.facebook.com/profile.php?id=61552474297024" target="_blank" rel="noopener noreferrer" className="arcana-btn" onClick={(e) => e.stopPropagation()}>
                <SiFacebook className="icon" /> Facebook
              </a>

              <a href="https://wa.me/527228418404" target="_blank" rel="noopener noreferrer" className="arcana-btn" onClick={(e) => e.stopPropagation()}>
                <SiWhatsapp className="icon" /> WhatsApp
              </a>

              <a href="https://www.google.com/maps/search/?api=1&query=Juan%20%C3%81lvarez%20poniente%20%23405%2C%20Francisco%20Murgu%C3%ADa%2C%2050130%20M%C3%A9xico%2C%20M%C3%A9x." target="_blank" rel="noopener noreferrer" className="arcana-btn" onClick={(e) => e.stopPropagation()}>
                <SiGooglemaps className="icon" /> Ubicación
              </a>

              <a href="https://enigmapublicidadydiseno.pages.dev/" target="_blank" rel="noopener noreferrer" className="arcana-btn" onClick={(e) => e.stopPropagation()}>
                <FaRocket className="icon" /> Proyectos
              </a>
            </div>
            <span className="flip-hint"></span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}