import React, { useEffect, useRef } from 'react';
import '../styles/GpuLasers.css';

const GpuLasers = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Shader matemático optimizado para lograr el haz difuminado y en movimiento
    const fragmentShaderSource = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Inclinación diagonal exacta
        float angle1 = 0.436;  // ~25 grados
        float angle2 = -0.349; // ~-20 grados

        vec2 uv1 = vec2(uv.x * cos(angle1) - uv.y * sin(angle1), uv.x * sin(angle1) + uv.y * cos(angle1));
        vec2 uv2 = vec2(uv.x * cos(angle2) - uv.y * sin(angle2), uv.x * sin(angle2) + uv.y * cos(angle2));

        // Movimiento ondulatorio suave con el tiempo
        float move1 = sin(time * 0.4) * 0.4;
        float move2 = cos(time * 0.3) * 0.4;

        // Distancia al centro de los haces con difuminado suave (glow ambiental)
        float d1 = abs(uv1.y + move1);
        float d2 = abs(uv2.y + move2);

        // Control de grosor y difuminado (valores altos de división generan el efecto de gas/luz difusa)
        float beam1 = 0.02 / (d1 + 0.03);
        float beam2 = 0.02 / (d2 + 0.03);

        vec3 color = vec3(0.0);
        
        // Aplicamos la paleta de colores de tus haces (Cian/Magenta arriba y Amarillo/Azul abajo)
        color += beam1 * vec3(0.0, 0.5, 0.9) * 0.8; // Cian
        color += beam1 * vec3(0.8, 0.0, 0.4) * 0.6; // Magenta
        
        color += beam2 * vec3(0.9, 0.7, 0.0) * 0.8; // Amarillo
        color += beam2 * vec3(0.0, 0.2, 0.6) * 0.6; // Azul

        // Viñeteado suave en los bordes
        float vignette = 1.0 - length(uv) * 0.5;
        
        gl_FragColor = vec4(color * vignette, 1.0);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "time");
    const resLoc = gl.getUniformLocation(program, "resolution");

    let animId;
    const render = (t) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="gpu-canvas" />;
};

export default GpuLasers;